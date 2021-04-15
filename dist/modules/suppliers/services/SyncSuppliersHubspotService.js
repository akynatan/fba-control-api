"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var hubspot = _interopRequireWildcard(require("@hubspot/api-client"));

var _ICacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/models/ICacheProvider"));

var _ISuppliersRepository = _interopRequireDefault(require("../repositories/ISuppliersRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

let CreateSupplierService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('SuppliersRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('CacheProvider')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _ISuppliersRepository.default === "undefined" ? Object : _ISuppliersRepository.default, typeof _ICacheProvider.default === "undefined" ? Object : _ICacheProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class CreateSupplierService {
  constructor(suppliersRepository, cacheProvider) {
    this.suppliersRepository = suppliersRepository;
    this.cacheProvider = cacheProvider;
  }

  async execute() {
    const hubspotClient = new hubspot.Client({
      apiKey: process.env.API_KEY_HUBSPOT
    }); // const allSuppliers = await hubspotClient.crm.companies.searchApi.doSearch({
    //   after: 0,
    //   limit: 100,
    //   properties: [
    //     'city',
    //     'description',
    //     'industry',
    //     'about_us',
    //     'phone',
    //     'zip',
    //     'state',
    //     'region',
    //     'is_public',
    //     'country',
    //     'name',
    //     'hs_lead_status',
    //   ],
    //   sorts: [
    //     JSON.stringify({ propertyName: 'createdate', direction: 'DESCENDING' }),
    //   ],
    //   filterGroups: [
    //     {
    //       filters: [
    //         // {
    //         //   propertyName: 'hs_lead_status',
    //         //   operator: 'EQ',
    //         //   value: 'won ina analysis',
    //         // },
    //       ],
    //     },
    //   ],
    // });

    const allSuppliers2 = await hubspotClient.crm.companies.getAll(undefined, undefined, ['hs_lead_status', 'name', 'domain']);
    console.log(allSuppliers2);
    console.log(allSuppliers2);
    const suppliers = allSuppliers2.map(async supplier => {
      const {
        domain,
        name,
        hs_object_id
      } = supplier.properties;
      const id_hubspot = Number(hs_object_id);

      if (name !== null && domain !== null) {
        const supplierInsered = await this.suppliersRepository.create({
          name,
          domain,
          id_hubspot
        });
        return supplierInsered;
      }

      return {};
    }); // return allSuppliers;

    return Promise.all(suppliers);
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.default = CreateSupplierService;