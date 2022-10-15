export enum Role {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  STOREKEEPER = 'STOREKEEPER',
  MAIN_STOREKEEPER = 'MAIN_STOREKEEPER',
  AUDITOR = 'AUDITOR',
  ACCOUNTANT = 'ACCOUNTANT',
  GUEST = 'GUEST',
}

export interface IOrganization {
  active: boolean;
  bin: string;
  description: string;
  email: string;
  factAddress: string;
  id: number;
  legalAddress: string;
  name: string;
  phones: string;
}

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  iin: string;
  orgId: number;
  organization: IOrganization;
  phoneNumber: string;
  active: boolean;
  email: string;
  locale: string;
  notify: boolean;
  role: Role;
}

export interface ICategory {
  id: number;
  name: string;
  description: string;
}

export interface ITmc {
  id: number;
  name: string;
  description: string;
  catId: number;
}

export interface IStore {
  id: number;
  name: string;
  area: string;
  address: string;
  lan: string;
  lat: string;
  favourite: boolean;
}

export interface IProduct {
  active: boolean;
  id: number;
  name: string;
  orgId: number;
  packQuantity: number;
  storeId: number;
  tmcId: number;
  category: ICategory;
  tmc: ITmc;
  favourite: boolean;
}

export type Language = 'kz' | 'ru' | 'en';

export interface ITranslation {
  key: string;
  kz: string;
  ru: string;
  en: string;
}

export interface IGood {
  code: string;
  name: string;
  unit: string;
  totalAmount: number;
  singleAmount: number;
  price: number;
}

export interface IRequest {
  id: number;
  name: string;
  organization: string;
  date: string;
}

export interface IRequestInfo {
  name: string;
  mol: string[];
  executor: string;
  status: string;
}

export interface IOptions {
  id: number;
  option: string;
}

export interface IItems {
  productId: number;
  quantity: number;
}

export interface IMove {
  employeeId: number;
  id: number;
  items: IItems[];
  movementDate: Date;
  regNumber: string;
  storeId: number;
}

export interface IMoveReception {
  certified: boolean;
  employeeId: number;
  expiredDate: Date;
  id: number;
  items: IItems[];
  movementDate: Date;
  providerId: number;
  regNumber: string;
  storeId: number;
}

export interface IMoveRelease {
  comment: string;
  employeeId: number;
  id: number;
  items: IItems[];
  movementDate: Date;
  providerId: number;
  regNumber: string;
  storeId: number;
}

export interface IListItems {
  id: number;
  productId: number;
  quantity: number;
}

export interface ISort {
  unsorted: boolean;
  sorted: boolean;
  empty: boolean;
}

export interface IProvider {
  id: number;
  orgId: number;
  name: string;
  bin: string;
  active: boolean;
}

export interface IEmployee {
  id: number;
  name: string;
  departement: string;
  orgId: number;
}

interface IPageable {
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  sort: ISort;
  unpaged: boolean;
}

export interface IGetResponseType {
  success: boolean;
  data: {
    id: number;
    type: string;
    regNumber: string;
    movementDate: bigint;
    createdDate: bigint;
    orgId: number;
    store: {
      id: number;
      orgId: number;
      name: string;
      address: string;
      stores: any[]; // favourite stores entity
      area: number;
      lat: number;
      lan: number;
      updateDate: bigint;
    };
    expiredDate: bigint;
    comment: string | null;
    employee: {
      id: number;
      name: string;
      departament: string;
      orgId: number;
      updateDate: bigint;
    };
    provider: IProvider;
    status: string;
    items: IListItems[];
    certified: boolean;
    pageable: IPageable;
    totalPages: number;
    totalElements: number;
    last: boolean;
    sort: ISort;
    first: boolean;
    numberOfElements: number;
    size: number;
    number: number;
    empty: boolean;
  };
}

export interface ICategory {
  description: string;
  id: number;
  name: string;
}

export interface ITmc extends ICategory {
  catId: number;
}

type TProductFlow = {
  id: number;
  userId: number;
};

export interface IAccountProduct {
  active: boolean;
  createDate: Date;
  guarantee: number;
  id: number;
  name: string;
  orgId: number;
  price: number;
  productFlows: TProductFlow[];
  quantity: number;
  storeId: number;
  tmcId: number;
  updateDate: Date;
}

export interface IListResponse<T> {
  content: T[];
  pageable: IPageable;
  totalPages: number;
  totalElements: number;
  last: number;
  sort: ISort;
  size: number;
  number: number;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}
