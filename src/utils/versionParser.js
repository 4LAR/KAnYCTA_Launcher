async function parseVersion(input) {
  return new Promise((resolve) => {
    const regexForge = /^forge\s+(\d+\.\d+\.\d+)$/i;
    const regexSnapshot = /^snapshot\s+(\S+)$/i;
    const regexRelease = /^(release\s+)?(\d+\.\d+\.\d+)$/i;

    let match;

    if ((match = regexForge.exec(input))) {
      resolve({ version: match[1], type: "release", forge: true });
    } else if ((match = regexSnapshot.exec(input))) {
      resolve({ version: match[1], type: "snapshot", forge: false });
    } else if ((match = regexRelease.exec(input))) {
      resolve({ version: match[2], type: "release", forge: false });
    } else {
      resolve(null);
    }
  });
}

module.exports = parseVersion
