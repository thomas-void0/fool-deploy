import net from 'net';
// probe whether is valid for port, Until a valid port number is assigned
function getValidPort(port: number): Promise<number> {
  return new Promise(async (resolve) => {
    let _port = port;
    while (_port) {
      const result = await probePort(_port);
      if (result) return resolve(_port);
      _port++;
    }
  });
}

function probePort(port: number) {
  const server = net.createServer().listen(port);

  return new Promise(function (resolve) {
    server.on('listening', function () {
      server && server.close();
      resolve(true);
    });
    server.on('error', function (err: any) {
      resolve(err.code !== 'EADDRINUSE');
    });
  });
}

export default getValidPort;
