import { createLogger, format, transports } from "winston";


import DailyRotateFile from "winston-daily-rotate-file";


// Notification Type
const NOTIFICATION = {
  TYPE_1: "HELPINBOX_NOTIFICATION"
};

// Logger
const logLevels = {
  fatal: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4,
  trace: 5,
};

const transport = new DailyRotateFile({
  filename: './log/helpinbox_notification-%DATE%.log',
  datePattern: 'YYYY-MM-DD HH:mm:ss',
  zippedArchive: true,
  maxSize: '20m', // Max size of the log file before rotation
  maxFiles: '6d', // Retain logs for 14 days
});


const logger = createLogger({
  levels: logLevels,
  transports: [
    transport,
    new transports.Console(),
    new transports.File({
      filename: './log/helpinbox_notification.log'
    })
  ],
  format: format.combine(
    format.label({
      label: `HelpinBox🏷️`
    }),
    format.timestamp({
      format: 'MMM-DD-YYYY HH:mm:ss'
    }),
    format.printf(info => `${info.level}: ${info.label}: ${[info.timestamp]}: ${info.message}`)
  )
});

export default logger;
