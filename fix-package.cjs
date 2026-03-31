const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
for (const deps of ['dependencies', 'devDependencies']) {
  if (!pkg[deps]) continue;
  for (const [key, val] of Object.entries(pkg[deps])) {
    if (val === 'catalog:') {
      if (key.startsWith('@types/react')) pkg[deps][key] = '^18.2.0';
      else if (key === 'react' || key === 'react-dom') pkg[deps][key] = '^18.2.0';
      else pkg[deps][key] = '*';
    } else if (val === 'workspace:*' || val.startsWith('workspace:')) {
      delete pkg[deps][key];
    }
  }
}
fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
console.log('Done');
