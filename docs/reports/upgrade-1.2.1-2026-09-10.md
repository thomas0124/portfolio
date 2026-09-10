# Upgrade Report — 1.2.1

Generated: 2026-09-10T05:58:41Z

## Summary

| Category | Count |
|---|---|
| Deleted | 0 |
| Created | 0 |
| Updated | 1 |
| Manifest refresh | 0 |
| Unresolved drift | 0 |
| Advisories | 1 |
| Legacy skipped | 0 |

## Applied

### Updated

- `.codex/config.toml`

## Advisories

### `ralph.toml` (owner: seed)

```diff
--- local
+++ template (1.2.1)
@@ 旧 L6–11  →  新 L6–15 @@
 6  6 │  # the codex binary is missing. The accompanying `.codex/config.toml` is loaded
 7  7 │  # only when `codex trust .` has been run for this project; see .codex/README.md.
 8  8 │  require_codex_cli = false
    9 │ +# OpenCode is optional by default — set to true to fail `ralph doctor` when
   10 │ +# the opencode binary is missing. Only meaningful if you opt in to opencode
   11 │ +# org seats (see [org] driver_pool below).
   12 │ +require_opencode_cli = false
 9 13 │  require_go = false
10 14 │  
11 15 │  # [org] — envelope config for the `ralph org` verb set (spawn / send / wait /
@@ 旧 L18–23  →  新 L22–38 @@
18 22 │  # model_pool entries are CLI-native model names/aliases, passed verbatim to
19 23 │  # `claude --model` / `codex --model` (aliases don't go stale like full model
20 24 │  # IDs would). Each entry's driver must be present in driver_pool above.
   25 │ +#
   26 │ +# OpenCode seats are opt-in: add "opencode" to driver_pool and matching
   27 │ +# model_pool entries. OpenCode models use the provider/model form and are
   28 │ +# passed verbatim to `opencode run --model`:
   29 │ +#
   30 │ +#   driver_pool = ["claude", "codex", "opencode"]
   31 │ +#   model_pool = [
   32 │ +#     ...,
   33 │ +#     { driver = "opencode", model = "opencode/big-pickle" },
   34 │ +#   ]
   35 │ +#
21 36 │  model_pool = [
22 37 │    { driver = "claude", model = "opus" },
23 38 │    { driver = "claude", model = "sonnet" },
@@ 旧 L42–52  →  新 L57–69 @@
42 57 │  # [org.permissions] controls the seat permission-mode envelope: how much
43 58 │  # autonomy a spawned seat's driver runs with, translated to driver-native
44 59 │  # flags at spawn time (claude: --permission-mode bypassPermissions|
45    │ -# acceptEdits|<none>). Modes: autonomous (no interactive prompts) | edits
   60 │ +# acceptEdits|<none>; opencode: autonomous -> `opencode run --auto`).
   61 │ +# Modes: autonomous (no interactive prompts) | edits
46 62 │  # (auto-accept file edits, still prompts otherwise) | guarded (the driver
47 63 │  # CLI's own interactive default). codex seats only accept guarded today --
48 64 │  # codex's interactive permission flags are fail-closed until live-verified
49    │ -# (see docs/tech-debt/README.md).
   65 │ +# (see docs/tech-debt/README.md). opencode seats accept autonomous/guarded;
   66 │ +# edits fails closed (OpenCode's run CLI has no edits-equivalent flag).
50 67 │  [org.permissions]
51 68 │  default = "autonomous"
52 69 │  # codex_verified gates codex seats' autonomous/edits permission modes:
```

