import pinoHttp from 'pino-http';

export const pino = pinoHttp({
  autoLogging: false,
  customLogLevel: function (req, res, err) {
    if (res.statusCode >= 400 && res.statusCode < 500) return 'warn';
    if (res.statusCode >= 500 || err) return 'error';
    if (res.statusCode >= 300 && res.statusCode < 400) return 'silent';
    return 'debug';
  },
  level: process.env.LOG_LEVEL || 'info',
  formatters: {
    level: (label: string) => {
      return {
        level: label,
      };
    },
  },
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
});

export const log = {
  info: (msg: string, details?: object) =>
    pino.logger.info({ details: { ...details } }, `${msg}`),
  debug: (msg: string, details?: object) =>
    pino.logger.debug({ details: { ...details } }, `${msg}`),
  error: (msg: string, details?: object) =>
    pino.logger.error({ details: { ...details } }, `${msg}`),
};
