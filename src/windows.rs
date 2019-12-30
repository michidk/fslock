#[cfg(not(feature = "std"))]
use core::{
    convert::TryFrom,
    fmt::{self, Write},
    slice,
};
#[cfg(not(feature = "std"))]
use winapi::{
    shared::minwindef::{DWORD, LPVOID, TRUE},
    um::{
        synchapi::WaitForSingleObject,
        winbase::{
            FormatMessageW,
            LocalFree,
            FORMAT_MESSAGE_ALLOCATE_BUFFER,
            FORMAT_MESSAGE_FROM_SYSTEM,
            FORMAT_MESSAGE_IGNORE_INSERTS,
            WAIT_FAILED,
        },
        winnt::LANG_USER_DEFAULT,
        winnt::LPWSTR,
    },
};

use core::{mem::MaybeUninit, ptr};
use winapi::{
    shared::winerror::ERROR_LOCK_VIOLATION,
    um::{
        errhandlingapi::GetLastError,
        fileapi::{LockFileEx, UnlockFileEx},
        handleapi::CloseHandle,
        minwinbase::{
            LOCKFILE_EXCLUSIVE_LOCK,
            LOCKFILE_FAIL_IMMEDIATELY,
            LPOVERLAPPED,
            OVERLAPPED,
        },
        winnt::HANDLE,
    },
};

/// A type representing file descriptor on Unix.
pub type FileDesc = HANDLE;

#[cfg(feature = "std")]
/// An IO error.
pub type Error = std::io::Error;

#[cfg(not(feature = "std"))]
#[derive(Debug)]
/// An IO error. Without std, you can only get a message or an OS error code.
pub struct Error {
    code: i32,
}

#[cfg(not(feature = "std"))]
impl Error {
    /// Creates an error from a raw OS error code.
    pub fn from_raw_os_error(code: i32) -> Self {
        Self { code }
    }

    /// Creates an error from the last OS error code.
    pub fn last_os_error() -> Error {
        Self::from_raw_os_error(unsafe { GetLastError() } as i32)
    }

    /// Raw OS error code. Returns option for compatibility with std.
    pub fn raw_os_error(&self) -> Option<i32> {
        Some(self.code)
    }
}

#[cfg(not(feature = "std"))]
impl fmt::Display for Error {
    fn fmt(&self, fmt: &mut fmt::Formatter) -> fmt::Result {
        let mut buf: LPWSTR = ptr::null_mut();
        let res = unsafe {
            FormatMessageW(
                FORMAT_MESSAGE_ALLOCATE_BUFFER
                    | FORMAT_MESSAGE_FROM_SYSTEM
                    | FORMAT_MESSAGE_IGNORE_INSERTS,
                ptr::null_mut(),
                self.code as DWORD,
                LANG_USER_DEFAULT as DWORD,
                &mut buf as *mut LPWSTR as LPWSTR,
                0,
                ptr::null_mut(),
            )
        };

        if res == 0 {
            write!(fmt, "error getting error message")?;
        } else {
            {
                let slice = unsafe {
                    slice::from_raw_parts(buf as *const u16, res as usize)
                };
                write_wide_str(fmt, slice)?;
            }
            unsafe {
                LocalFree(buf as LPVOID);
            }
        }

        Ok(())
    }
}

#[cfg(not(feature = "std"))]
fn write_wide_str<W>(fmt: &mut W, string: &[u16]) -> fmt::Result
where
    W: Write,
{
    let mut suplement = false;
    let mut prev = 0;
    for &code in string {
        if suplement {
            let high = prev as u32 - 0xD800;
            let low = code as u32 - 0xDC00;
            let ch = char::try_from((high << 10 | low) + 0x10000)
                .expect("Inconsistent char implementation");
            write!(fmt, "{}", ch)?;
        } else if code <= 0xD7Ff || code >= 0xE000 {
            let ch = char::try_from(code as u32)
                .expect("Inconsistent char implementation");
            write!(fmt, "{}", ch)?;
        } else {
            suplement = true;
            prev = code;
        }
    }

    Ok(())
}

/// Opens a file with only purpose of locking it. Creates it if it does not
/// exist. Path must not contain a nul-byte in the middle, but a nul-byte in the
/// end (and only in the end) is allowed, which in this case no extra allocation
/// will be made. Otherwise, an extra allocation is made.
pub fn open(path: &[u8]) -> Result<FileDesc, Error> {
    unimplemented!()
}

/// Tries to lock a file and blocks until it is possible to lock.
pub fn lock(handle: FileDesc) -> Result<(), Error> {
    let mut overlapped: OVERLAPPED =
        unsafe { MaybeUninit::zeroed().assume_init() };
    unsafe {
        overlapped.u.s_mut().Offset = 0;
        overlapped.u.s_mut().OffsetHigh = 0;
    }
    overlapped.hEvent = ptr::null_mut();

    let res = unsafe {
        LockFileEx(
            handle,
            LOCKFILE_EXCLUSIVE_LOCK,
            0,
            DWORD::max_value(),
            DWORD::max_value(),
            &mut overlapped as LPOVERLAPPED,
        )
    };
    if res == TRUE {
        let res = unsafe { WaitForSingleObject(overlapped.hEvent, 0) };
        if res != WAIT_FAILED {
            Ok(())
        } else {
            Err(Error::last_os_error())
        }
    } else {
        Err(Error::last_os_error())
    }
}

/// Tries to lock a file but returns as soon as possible if already locked.
pub fn try_lock(handle: FileDesc) -> Result<bool, Error> {
    let mut overlapped: OVERLAPPED =
        unsafe { MaybeUninit::zeroed().assume_init() };
    unsafe {
        overlapped.u.s_mut().Offset = 0;
        overlapped.u.s_mut().OffsetHigh = 0;
    }
    overlapped.hEvent = ptr::null_mut();

    let res = unsafe {
        LockFileEx(
            handle,
            LOCKFILE_EXCLUSIVE_LOCK | LOCKFILE_FAIL_IMMEDIATELY,
            0,
            DWORD::max_value(),
            DWORD::max_value(),
            &mut overlapped as LPOVERLAPPED,
        )
    };
    if res == TRUE {
        let res = unsafe { WaitForSingleObject(overlapped.hEvent, 0) };
        if res != WAIT_FAILED {
            Ok(true)
        } else {
            Err(Error::last_os_error())
        }
    } else {
        let err = unsafe { GetLastError() };
        if err == ERROR_LOCK_VIOLATION {
            Ok(false)
        } else {
            Err(Error::from_raw_os_error(err as i32))
        }
    }
}

/// Unlocks the file.
pub fn unlock(handle: FileDesc) -> Result<(), Error> {
    let mut overlapped: OVERLAPPED =
        unsafe { MaybeUninit::zeroed().assume_init() };
    unsafe {
        overlapped.u.s_mut().Offset = 0;
        overlapped.u.s_mut().OffsetHigh = 0;
    }
    overlapped.hEvent = ptr::null_mut();

    let res = unsafe {
        UnlockFileEx(
            handle,
            0,
            DWORD::max_value(),
            DWORD::max_value(),
            &mut overlapped as LPOVERLAPPED,
        )
    };
    if res == TRUE {
        let res = unsafe { WaitForSingleObject(overlapped.hEvent, 0) };
        if res != WAIT_FAILED {
            Ok(())
        } else {
            Err(Error::last_os_error())
        }
    } else {
        Err(Error::last_os_error())
    }
}

/// Removes a file. Path must not contain a nul-byte in the middle, but a
/// nul-byte in the end (and only in the end) is allowed, which in this case no
/// extra allocation will be made. Otherwise, an extra allocation is made.
pub fn remove(path: &[u8]) -> Result<(), Error> {
    unimplemented!()
}

/// Closes the file.
pub fn close(handle: FileDesc) {
    unsafe {
        CloseHandle(handle);
    }
}