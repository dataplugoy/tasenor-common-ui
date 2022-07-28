import { useLocation, Location, useNavigate, NavigateFunction } from "react-router-dom"
import { DatabaseName, isDatabaseName } from '@dataplug/tasenor-common'
import { ID } from 'interactive-elements'

export type MainMenu = "" | "admin" | "dashboard" | "txs" | "account" | "report" | "tools" | "import" | "settings" | "classop"
const mainMenuSet = new Set(["", "admin", "dashboard", "txs", "account", "report", "tools", "import", "settings", "classop"])
export const isMainMenu = (name: unknown): name is MainMenu => typeof name === 'string' && mainMenuSet.has(name)

export class MenuState {
  db: DatabaseName
  main: MainMenu
  periodId: ID
  accountId: ID
  side: string
  attrs: Record<string, string>

  nav: NavigateFunction

  constructor(loc: Location, nav: NavigateFunction) {
    this.db = '' as DatabaseName
    this.main = ''
    this.periodId = null
    this.accountId = null
    this.side = ''
    this.attrs = {}

    this.nav = nav

    if (loc) {
      const [ , db, main, periodId, accountId, side] = loc.pathname.split('/')
      this.parse({ db, main, periodId, accountId, side })
    }
  }

  /**
   * Collect valid path values from records and ignore the rest.
   */
  parse(params: Record<string, string>): void {
    const { db, main, periodId, accountId, side } = params
    if (db !== undefined) {
      this.db = isDatabaseName(db) ? db : '' as DatabaseName
    }
    if (main !== undefined) {
      this.main = isMainMenu(main) ? main : ''
    }
    if (periodId !== undefined) {
      this.periodId = periodId === '' ? null : parseInt(periodId)
    }
    if (accountId !== undefined) {
      this.accountId = accountId === '' ? null : parseInt(accountId)
    }
    if (side !== undefined) {
      this.side = side
    }
  }

  go(to: Record<string, string>): void {
    this.parse(to)
    // TODO: Could use this.nav(this.url, { replace: true }) when changing only attr values?
    this.nav(this.url)
  }

  get url(): string {
    const url = `/${this.db}/${this.main}/${this.periodId || ''}/${this.accountId || ''}/${this.side}`
    return url.replace(/\/+$/, '')
  }
}

export const useNavigation = (): MenuState => {
  const loc = useLocation()
  const nav = useNavigate()
  return new MenuState(loc, nav)
}
