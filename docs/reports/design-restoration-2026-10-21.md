# Original visual design restoration

User requested removing the added design because the signature resembled the reference site. Removed the signature component and both usages, restored the header markup and hero spacing, removed the new role underline, and restored the original seasonal particle shapes/colors from the task base. Font/image/static export improvements and immediate content rendering remain.

Seasonal rendering is capped at 30fps, cancels animation in hidden documents, and uses a single still frame for reduced motion. Resize, visibility and motion listeners and animation frames are cleaned up on unmount.

The implementer dispatch stopped because its role forbids editing overlapping uncommitted files; the parent made this scoped follow-up inline. Parent reviewed timer/frame cleanup and the design-only changes, and ran `npm run build` and `./scripts/run-verify.sh`: PASS, including lint/type checks and all 8 API tests. Chromium smoke passed for all five pages at desktop/mobile widths, theme/menu/profile/role actions, mocked contact success/error, JavaScript-disabled homepage, and stable Canvas pixels under reduced motion. The restored desktop screenshot was visually inspected against the pre-change screenshot. No new behavioral test framework was added for this visual correction.

The separate Gmail authentication issue remains unresolved. New guidance is to replace `EMAIL_SERVER_PASSWORD` directly in the Cloudflare Worker's secrets using a newly generated app password from the account configured as `EMAIL_SERVER_USER`. Secrets must not be pasted into chat. No mail sent by this correction.
