---
title: Blocks/PasswordSet/docs
id: Blocks/PasswordSet/docs
---

# BlockPasswordSet

The `BlockPasswordSet` is a secure and user-friendly block designed for setting a new password. When accessing the link
from the `BlockPasswordReset` email, users are directed to this block, where they can enter and confirm their new
password. If the reset token is invalid or expired, users are redirected to the login page. The block ensures a smooth
and accessible experience while maintaining robust security standards.

## Installation

```bash
npx @lenne.tech/cli blocks add BlockPasswordSet
```
