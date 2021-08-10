(function() {var implementors = {};
implementors["fslock"] = [{"text":"impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.54.0/std/panic/trait.RefUnwindSafe.html\" title=\"trait std::panic::RefUnwindSafe\">RefUnwindSafe</a> for <a class=\"struct\" href=\"fslock/struct.OsString.html\" title=\"struct fslock::OsString\">OsString</a>","synthetic":true,"types":["fslock::unix::OsString"]},{"text":"impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.54.0/std/panic/trait.RefUnwindSafe.html\" title=\"trait std::panic::RefUnwindSafe\">RefUnwindSafe</a> for <a class=\"struct\" href=\"fslock/struct.OsStr.html\" title=\"struct fslock::OsStr\">OsStr</a>","synthetic":true,"types":["fslock::unix::OsStr"]},{"text":"impl&lt;'str&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.54.0/std/panic/trait.RefUnwindSafe.html\" title=\"trait std::panic::RefUnwindSafe\">RefUnwindSafe</a> for <a class=\"enum\" href=\"fslock/enum.EitherOsStr.html\" title=\"enum fslock::EitherOsStr\">EitherOsStr</a>&lt;'str&gt;","synthetic":true,"types":["fslock::EitherOsStr"]},{"text":"impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.54.0/std/panic/trait.RefUnwindSafe.html\" title=\"trait std::panic::RefUnwindSafe\">RefUnwindSafe</a> for <a class=\"struct\" href=\"fslock/struct.LockFile.html\" title=\"struct fslock::LockFile\">LockFile</a>","synthetic":true,"types":["fslock::LockFile"]}];
implementors["once_cell"] = [{"text":"impl&lt;T&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.54.0/std/panic/trait.RefUnwindSafe.html\" title=\"trait std::panic::RefUnwindSafe\">RefUnwindSafe</a> for <a class=\"struct\" href=\"once_cell/sync/struct.OnceCell.html\" title=\"struct once_cell::sync::OnceCell\">OnceCell</a>&lt;T&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;T: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.54.0/std/panic/trait.RefUnwindSafe.html\" title=\"trait std::panic::RefUnwindSafe\">RefUnwindSafe</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/1.54.0/std/panic/trait.UnwindSafe.html\" title=\"trait std::panic::UnwindSafe\">UnwindSafe</a>,&nbsp;</span>","synthetic":true,"types":["once_cell::sync::OnceCell"]},{"text":"impl&lt;T&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.54.0/std/panic/trait.RefUnwindSafe.html\" title=\"trait std::panic::RefUnwindSafe\">RefUnwindSafe</a> for <a class=\"struct\" href=\"once_cell/race/struct.OnceBox.html\" title=\"struct once_cell::race::OnceBox\">OnceBox</a>&lt;T&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;T: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.54.0/std/panic/trait.RefUnwindSafe.html\" title=\"trait std::panic::RefUnwindSafe\">RefUnwindSafe</a>,&nbsp;</span>","synthetic":true,"types":["once_cell::race::once_box::OnceBox"]},{"text":"impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.54.0/std/panic/trait.RefUnwindSafe.html\" title=\"trait std::panic::RefUnwindSafe\">RefUnwindSafe</a> for <a class=\"struct\" href=\"once_cell/race/struct.OnceNonZeroUsize.html\" title=\"struct once_cell::race::OnceNonZeroUsize\">OnceNonZeroUsize</a>","synthetic":true,"types":["once_cell::race::OnceNonZeroUsize"]},{"text":"impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.54.0/std/panic/trait.RefUnwindSafe.html\" title=\"trait std::panic::RefUnwindSafe\">RefUnwindSafe</a> for <a class=\"struct\" href=\"once_cell/race/struct.OnceBool.html\" title=\"struct once_cell::race::OnceBool\">OnceBool</a>","synthetic":true,"types":["once_cell::race::OnceBool"]},{"text":"impl&lt;T:&nbsp;<a class=\"trait\" href=\"https://doc.rust-lang.org/1.54.0/std/panic/trait.RefUnwindSafe.html\" title=\"trait std::panic::RefUnwindSafe\">RefUnwindSafe</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/1.54.0/std/panic/trait.UnwindSafe.html\" title=\"trait std::panic::UnwindSafe\">UnwindSafe</a>&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.54.0/std/panic/trait.RefUnwindSafe.html\" title=\"trait std::panic::RefUnwindSafe\">RefUnwindSafe</a> for <a class=\"struct\" href=\"once_cell/unsync/struct.OnceCell.html\" title=\"struct once_cell::unsync::OnceCell\">OnceCell</a>&lt;T&gt;","synthetic":false,"types":["once_cell::unsync::OnceCell"]},{"text":"impl&lt;T, F:&nbsp;<a class=\"trait\" href=\"https://doc.rust-lang.org/1.54.0/std/panic/trait.RefUnwindSafe.html\" title=\"trait std::panic::RefUnwindSafe\">RefUnwindSafe</a>&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.54.0/std/panic/trait.RefUnwindSafe.html\" title=\"trait std::panic::RefUnwindSafe\">RefUnwindSafe</a> for <a class=\"struct\" href=\"once_cell/unsync/struct.Lazy.html\" title=\"struct once_cell::unsync::Lazy\">Lazy</a>&lt;T, F&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;<a class=\"struct\" href=\"once_cell/unsync/struct.OnceCell.html\" title=\"struct once_cell::unsync::OnceCell\">OnceCell</a>&lt;T&gt;: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.54.0/std/panic/trait.RefUnwindSafe.html\" title=\"trait std::panic::RefUnwindSafe\">RefUnwindSafe</a>,&nbsp;</span>","synthetic":false,"types":["once_cell::unsync::Lazy"]},{"text":"impl&lt;T, F:&nbsp;<a class=\"trait\" href=\"https://doc.rust-lang.org/1.54.0/std/panic/trait.RefUnwindSafe.html\" title=\"trait std::panic::RefUnwindSafe\">RefUnwindSafe</a>&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.54.0/std/panic/trait.RefUnwindSafe.html\" title=\"trait std::panic::RefUnwindSafe\">RefUnwindSafe</a> for <a class=\"struct\" href=\"once_cell/sync/struct.Lazy.html\" title=\"struct once_cell::sync::Lazy\">Lazy</a>&lt;T, F&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;<a class=\"struct\" href=\"once_cell/sync/struct.OnceCell.html\" title=\"struct once_cell::sync::OnceCell\">OnceCell</a>&lt;T&gt;: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.54.0/std/panic/trait.RefUnwindSafe.html\" title=\"trait std::panic::RefUnwindSafe\">RefUnwindSafe</a>,&nbsp;</span>","synthetic":false,"types":["once_cell::sync::Lazy"]}];
if (window.register_implementors) {window.register_implementors(implementors);} else {window.pending_implementors = implementors;}})()