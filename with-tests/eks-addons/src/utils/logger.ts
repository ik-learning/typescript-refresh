
class Logger {
  debug(meta: Record<string, any>, msg?: string) {
    console.log(meta, msg)
  }
}

export const logger: Logger = new Logger();
