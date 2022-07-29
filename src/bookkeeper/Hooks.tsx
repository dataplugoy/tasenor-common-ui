import { useLocation, useHistory, Location, History } from 'react-router-dom'
import { DatabaseName, isDatabaseName } from '@dataplug/tasenor-common'
import { ID } from 'interactive-elements'

// TODO: This could belong to bookkeeper repo. In future generic base could be here.
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

  history: History

  constructor(loc: Location, history: History) {
    this.db = '' as DatabaseName
    this.main = ''
    this.periodId = null
    this.accountId = null
    this.side = ''
    this.attrs = {}

    this.history = history

    if (loc) {
      const [ , db, main, periodId, accountId, side] = loc.pathname.split('/')
      const search = loc.search.length ? loc.search.substr(1).split('&').map(s => s.split('=')).reduce((prev, cur) => ({ [cur[0]]: cur[1], ...prev}), {}) : {}
      this.parse({ db, main, periodId, accountId, side, ...search })
    }
  }

  /**
   * Collect valid path values from records and ignore the rest.
   */
  parse(params: Record<string, string | null>): void {
    const { db, main, periodId, accountId, side } = params
    Object.keys(params).forEach(key => {
      switch(key) {
        case 'db':
          this.db = isDatabaseName(db) ? db : '' as DatabaseName
          break
        case 'main':
          this.main = isMainMenu(main) ? main : ''
          break
        case 'periodId':
          this.periodId = periodId === '' || periodId === null ? null : parseInt(periodId)
          break
        case 'accountId':
          this.accountId = accountId === '' || accountId === null ? null : parseInt(accountId)
          break
        case 'side':
          this.side = side || ''
          break
        default:
          if (params[key] !== null) {
            this.attrs[key] = params[key] || ''
          } else {
            delete this.attrs[key]
          }
      }
    })
  }

  go(to: Record<string, string | null>): void {
    this.parse(to)
    this.history.push(this.url)
  }

  get(variable: string) {
    switch(variable) {
      case 'db':
      case 'main':
      case 'periodId':
      case 'accountId':
      case 'side':
        return this[variable]
      default:
        return this.attrs[variable]
    }
  }

  get url(): string {
    let url = `/${this.db}/${this.main}/${this.periodId || ''}/${this.accountId || ''}/${this.side}`
    url = url.replace(/\/+$/, '')
    const attrs = Object.keys(this.attrs).map(k => `${k}=${encodeURIComponent(this.attrs[k])}`)
    if (attrs.length) {
      url += `?${attrs.join('&')}`
    }
    return url
  }
}

export const useNavigation = (): MenuState => {
  const loc = useLocation()
  const his = useHistory()
  return new MenuState(loc, his)
}
