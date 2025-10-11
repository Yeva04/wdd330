import { copyFileSync } from "fs";

try {
  copyFileSync("redirect.html", "dist/index.html");
  console.log("✅ redirect.html copied successfully to dist/index.html");
} catch (err) {
  console.error("❌ Failed to copy redirect.html:", err);
}
