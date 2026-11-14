import { spawn } from 'node:child_process';
const windows = process.platform === 'win32';
const children = ['apps/backend', 'apps/frontend'].map(workspace => spawn(windows ? 'npm.cmd' : 'npm', ['run', 'dev', '-w', workspace], { stdio: 'inherit', shell: windows }));
let stopping = false;
function stop(code = 0) {
  if (stopping) return;
  stopping = true;
  for (const child of children) {
    if (windows && child.pid) spawn('taskkill', ['/pid', String(child.pid), '/T', '/F'], { stdio: 'ignore' });
    else child.kill('SIGTERM');
  }
  process.exitCode = code;
}
children.forEach(child => { child.on('error', () => stop(1)); child.on('exit', code => stop(code ?? 1)); });
process.on('SIGINT', () => stop());
process.on('SIGTERM', () => stop());
