/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { TasenorSetup, AccountModel, AccountNumber, AccountType, BalanceModel, Currency, Cursor, DatabaseModel, EntryModel, HeadingModel, ImporterModel, Language, PeriodModel, Tag, TagModel, TagType, Url, VATTarget, Asset, TasenorPlugin } from '@dataplug/tasenor-common'
import { ID, RealID } from 'interactive-elements'
import { sprintf } from 'sprintf-js'
import dayjs from 'dayjs'

const randomID = () => Math.round(Math.random() * 999999)

/**
 * Mock for tags.
 */
let nextOrder = 1
export class MockTagModel {
  id?: ID
  tag: null | Tag
  name: string
  picture: null | ArrayBuffer
  type: TagType
  order: number

  constructor(parent, params: { tag: Tag, name: string, type: TagType, order: undefined | number }) {
    this.id = randomID()
    this.tag = params.tag as Tag
    this.name = params.name
    this.type = params.type
    this.picture = null
    this.order = params.order ? params.order: nextOrder++
  }

  get url(): Url {
    const PICS = {
      CASH: 'q.png',
      HIL: 'hil.jpeg',
      TYL: 'hil.jpeg',
      NIH: 'nih.png',
      KIS: 'kis.jpeg',
      KRY: 'kry.png',
      MEG: 'meg.png',
      SPE: 'spe.jpeg',
      MAL: 'mal.jpeg',
      HP: 'hp.jpeg',
      JM: 'jm.jpeg',
      MA: 'ma.jpeg',
      ML: 'ml.jpeg',
      MP: 'mp.jpeg',
      AH: 'q.png',
      TA: 'ta.jpeg',
      TR: 'tr.jpeg',
      KR: 'kr.jpeg',
      MK: 'mk.jpeg',
      Nordnet: 'nordnet.jpeg',
    }
    return `http://localhost:3302/${this.tag && PICS[this.tag] ? PICS[this.tag] : PICS['CASH']}` as Url
  }

  async save(): Promise<void> {}
  async delete(): Promise<void> {}
}

/**
 * Mock for accounts.
 */
 export class MockAccountModel {
  id: ID
  number: AccountNumber
  name: string
  type: AccountType
  data: {
    favourite: boolean
    code: Asset | null
  }
  currency: Currency | null
  language: Language | null

  constructor(parent, params: { number: string, name: string, type: AccountType }) {
    this.id = randomID()
    this.number = params.number as AccountNumber
    this.name = params.name
    this.type = params.type
    this.data = {
      favourite: false,
      code: null
    }
    this.currency = 'EUR'
    this.language = 'fi'
  }

  getUrl(): Url {
    return '' as Url
  }
}

/**
 * Mock for databases.
 */
 export class MockDatabaseModel {
  name: null | string
  periodsById: Record<RealID, PeriodModel>
  accountsById: Record<RealID, AccountModel>
  accountsByNumber: Record<number, AccountModel>
  tagsByTag: Record<Tag, TagModel>
  headingsByNumber: Record<number, HeadingModel>

  constructor(parent, params: { name: string }) {
    this.name = params.name
    this.periodsById = {}
    this.headingsByNumber = {}

    this.accountsById = {}
    this.accountsByNumber = {}
    const ACCOUNTS = [
      {number: "1000", name: "Bank 1", type: AccountType.ASSET},
      {number: "1001", name: "Bank 2", type: AccountType.ASSET}
    ]
    ACCOUNTS.forEach(account => {
      const { number, name, type } = account
      const model = new MockAccountModel(null, { number, name, type })
      model.id = randomID()
      this.accountsByNumber[model.number] = model
      this.accountsById[model.id] = model
    })

    const TAGS = [{"id":1,"tag":"Y","name":"Yhteiskulut","mime":"image/jpeg","type":"Osakas","order":1},{"id":2,"tag":"MA","name":"Matt An","mime":"image/jpeg","type":"Osakas","order":1001},{"id":3,"tag":"TR","name":"Tom Rock","mime":"image/jpeg","type":"Osakas","order":1002},{"id":4,"tag":"HP","name":"Heiderberg","mime":"image/jpeg","type":"Osakas","order":1005},{"id":5,"tag":"MK","name":"Mick Karmiz","mime":"image/jpeg","type":"Osakas","order":1006},{"id":6,"tag":"KR","name":"Khadzya Kuznetsova","mime":"image/jpeg","type":"Osakas","order":1007},{"id":7,"tag":"TA","name":"Tom of Genuinela","mime":"image/jpeg","type":"Osakas","order":1009},{"id":8,"tag":"MP","name":"Micco Pedes","mime":"image/jpeg","type":"Osakas","order":1010},{"id":9,"tag":"JM","name":"Jon Mark Ulan-bator","mime":"image/jpeg","type":"Osakas","order":1011},{"id":10,"tag":"ML","name":"Mick III","mime":"image/jpeg","type":"Osakas","order":1012},{"id":11,"tag":"AH","name":"Antz Hertz","mime":"image/png","type":"Osakas","order":1013},{"id":12,"tag":"KIS","name":"Kiskuri","mime":"image/jpeg","type":"Rahasto","order":2001},{"id":13,"tag":"KRY","name":"Kryptinen","mime":"image/png","type":"Rahasto","order":2002},{"id":14,"tag":"MAL","name":"Malttamaton","mime":"image/jpeg","type":"Rahasto","order":2003},{"id":15,"tag":"TYL","name":"Tylsä","mime":"image/jpeg","type":"Rahasto","order":2004},{"id":16,"tag":"HIL","name":"Hilunki","mime":"image/jpeg","type":"Rahasto","order":2004},{"id":17,"tag":"NIH","name":"Nihkeä","mime":"image/png","type":"Rahasto","order":2005},{"id":18,"tag":"CASH","name":"Käteinen","mime":"image/jpeg","type":"Rahasto","order":2006},{"id":19,"tag":"SPE","name":"Spelöga","mime":"image/jpeg","type":"Rahasto","order":2007},{"id":20,"tag":"MEG","name":"Megalo","mime":"image/png","type":"Rahasto","order":2008},{"id":21,"tag":"FelFin","name":"Fellow Finance","mime":"image/jpeg","type":"Välittäjä","order":3001},{"id":22,"tag":"Degiro","name":"Degiro","mime":"image/jpeg","type":"Välittäjä","order":3002},{"id":23,"tag":"Kraken","name":"Kraken","mime":"image/png","type":"Välittäjä","order":3003},{"id":24,"tag":"CoinM","name":"Coinmotion","mime":"image/jpeg","type":"Välittäjä","order":3004},{"id":25,"tag":"Nordnet","name":"Nordnet","mime":"image/jpeg","type":"Välittäjä","order":3005},{"id":26,"tag":"CoinB","name":"Coinbase","mime":"image/png","type":"Välittäjä","order":3006},{"id":27,"tag":"Laina","name":"Lainaaja","mime":"image/jpeg","type":"Välittäjä","order":3007},{"id":28,"tag":"Reilu","name":"Reilutuotto","mime":"image/png","type":"Välittäjä","order":3008},{"id":29,"tag":"Fundu","name":"Fundu","mime":"image/png","type":"Välittäjä","order":3009},{"id":30,"tag":"GDAX","name":"GDAX","mime":"image/jpeg","type":"Välittäjä","order":3010},{"id":31,"tag":"Fixura","name":"Fixura","mime":"image/jpeg","type":"Välittäjä","order":3011},{"id":32,"tag":"PB","name":"PeerBerry","mime":"image/jpeg","type":"Välittäjä","order":3012},{"id":33,"tag":"Mintos","name":"Mintos","mime":"image/png","type":"Välittäjä","order":3013},{"id":34,"tag":"Env","name":"Envestio","mime":"image/png","type":"Välittäjä","order":3014},{"id":35,"tag":"BE","name":"Bulkestate","mime":"image/jpeg","type":"Välittäjä","order":3015},{"id":36,"tag":"CE","name":"Crowdestate","mime":"image/png","type":"Välittäjä","order":3016},{"id":37,"tag":"Lynx","name":"Lynx","mime":"image/png","type":"Välittäjä","order":3017},{"id":38,"tag":"Robo","name":"Robocash","mime":"image/png","type":"Välittäjä","order":3018},{"id":39,"tag":"Nordea","name":"Nordea","mime":"image/png","type":"Välittäjä","order":3019},{"id":40,"tag":"HitBTC","name":"HitBTC","mime":"image/jpeg","type":"Välittäjä","order":3020}]

    this.tagsByTag = {}
    TAGS.forEach(({ tag, name, type, order }) => {
      this.tagsByTag[tag] = new MockTagModel(null, { tag: tag as Tag, name, type: type as TagType, order })
    })
  }

  getAccountByNumber(number: string): AccountModel {
    return this.accountsByNumber[number]
  }

  getTag(tag: Tag): TagModel {
    return this.tagsByTag[tag]
  }

  async addTag(tag: Partial<TagModel>): Promise<TagModel> {
    throw new Error('Not implemented.')
  }
}

export class MockCatalog {

  history: unknown

  getCurrencies(): Currency[] {
    return ['EUR', 'USD', 'SEK', 'DKK']
  }

  language(): Language {
    return 'en'
  }

  money2str(cents: number, currency?: Currency, signed?: boolean): string {
    const sign = signed ? (cents < 0 ? '' : '+') : ''
    return sign + sprintf('%.2f', cents / 100)
  }

  date2str(date: string | number): string {
    return dayjs(date).format('YYYY-MM-DD')
  }

  t(str) {
    return str
  }

  getImportOptions(): Record<string, TasenorPlugin> {
    return {}
  }
}

/**
 * Mock for mobx store.
 */
 export class MockStore {
  db: string
  database: DatabaseModel
  dbsByName: Record<string, DatabaseModel>
  catalog: MockCatalog
  periodId: number | null
  period?: PeriodModel

  constructor() {
    this.db = 'mock'
    this.database = new MockDatabaseModel(null, { name: 'mock' })
    this.dbsByName = { mock: this.database }
    this.catalog = new MockCatalog()
  }

  async updateSettings(db: string | null, values: Record<string, unknown>): Promise<void> {
    console.log('Update settings', db, values)
  }

  addError(text:string): void {
    console.error(text)
  }

  addMessage(text:string): void {
    console.log(text)
  }

  get accounts(): AccountModel[] {
    return Object.values(this.database.accountsById)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async fetchImporter(db, importerId): Promise<ImporterModel> {
    return new ImporterModel()
  }

  async deleteDocument(doc): Promise<BalanceModel[]> {
    return []
  }

  getDocuments(accounts?: AccountNumber[], filter?: (e: EntryModel) => boolean) {
  }

  async fetchBalances(db?: string, periodId?: number): Promise<void> {
  }

  async request(path, method = 'GET', data = null, file = null, noDimming = false) {
  }

  rispSetup(baseUrl: string): TasenorSetup {
    return setup
  }
}

export class CursorMock {
  disableHandler(): void {}
  enableHandler(): void {}
  handle(key: string): void {}
  addModal(name: string, hooks: Record<string, (cursor: Cursor, key: string) => void>) {}
  removeModal(name: string) {}
}

export class SettingsMock {
  get(name: string): unknown {
    return null
  }
}

export const setup: TasenorSetup = {
  store: new MockStore(),
  baseUrl: '',
  token: '',
  errorMessage: () => console.log('ERROR'),
  successMessage: () => console.log('OK')
}
