export const CODE_LIST_ROW1 =[
    {image:require('../../image/type_korea.png'), image_f:require('../../image/type_korea_f.png'), name:'한식', code:'ST001'},
    {image:require('../../image/type_china.png'), image_f:require('../../image/type_china_f.png'),name:'중식', code:'ST002'},
    {image:require('../../image/type_japan.png'), image_f:require('../../image/type_japan_f.png'),name:'일식', code:'ST003'},
    {image:require('../../image/type_west.png'), image_f:require('../../image/type_west_f.png'),name:'양식', code:'ST004'},
];

export const CODE_LIST_ROW2 =[
    {image:require('../../image/type_ethnic.png'), image_f:require('../../image/type_ethnic_f.png'),name:'에스닉', code:'ST005'},
    {image:require('../../image/type_pizza.png'), image_f:require('../../image/type_pizza_f.png'), name:'피자,햄버거,샌드위치', code:'ST006'},
    {image:require('../../image/type_chicken.png'), image_f:require('../../image/type_chicken_f.png'), name:'치킨', code:'ST007'},
    {image:require('../../image/type_powder.png'), image_f:require('../../image/type_powder_f.png'), name:'분식', code:'ST008'},
];

export const CODE_LIST_ROW3 =[
    {image:require('../../image/type_cafe.png'), image_f:require('../../image/type_cafe_f.png'), name:'카페', code:'ST009'},
    {image:require('../../image/type_drink.png'), image_f:require('../../image/type_drink_f.png'), name:'음료', code:'ST010'},
    {image:require('../../image/type_dessert.png'), image_f:require('../../image/type_dessert_f.png'), name:'제과(디저트)', code:'ST011'},
    {image:require('../../image/type_alcohol.png'), image_f:require('../../image/type_alcohol_f.png'), name:'주점', code:'ST012'},
];

export const ING_LIST_ROW1 = [
    {image:require('../../image/ing_vegi.png'), name:'일반', code:'IG001'},
    {image:require('../../image/ing_seafood.png'), name:'수산물', code:'IG004'},
]

export const ING_LIST_ROW2 = [
    {image:require('../../image/ing_meat.png'), name:'육류', code:'IG003'},
    {image:require('../../image/ing_oatmeal.png'), name:'밀가루(면)', code:'IG002'},
]

export const EMPLOYEE_LIST=[
    {name:'1명', code:1},
    {name:'2명', code:2},
    {name:'3명', code:3},
    {name:'4명', code:4},
    {name:'5명', code:5},
    {name:'10명', code:10},
    {name:'10명 초과', code:11},
]

export const SIT_LIST=[
    {name:'9석 이하', code:'BS001'},
    {name:'10-19석', code:'BS002'},
    {name:'20-29석', code:'BS003'},
    {name:'30-39석', code:'BS004'},
    {name:'40-49석', code:'BS005'},
    {name:'50-59석', code:'BS006'},
]


export const HOW_LIST = [
    {text:'일반조리',code:'HC001'},
    {text:'구이',code:'HC002'},
    {text:'국물',code:'HC003'},
    {text:'비가열',code:'HC004'},
    {text:'오븐',code:'HC005'},
    {text:'찜',code:'HC006'},
    {text:'철판',code:'HC007'},
    {text:'튀김',code:'HC008'},
    {text:'기타',code:'HC009'},
]

export const HOUR_LIST=[
    {name:'1시', code:1},
    {name:'2시', code:2},
    {name:'3시', code:3},
    {name:'4시', code:4},
    {name:'5시', code:5},
    {name:'6시', code:6},
    {name:'7시', code:7},
    {name:'8시', code:8},
    {name:'9시', code:9},
    {name:'10시', code:10},
    {name:'11시', code:11},
    {name:'12시', code:12},
]

// export const ALCOHOL_LIST = [
//     {text:'소주',code:'AL001'},
//     {text:'맥주',code:'AL002'},
//     {text:'와인',code:'AL003'},
//     {text:'기타',code:'AL004'},
// ]

export const GT_LIST = [
    {text:'동일 업종'},
    {text:'동일 매출액'},
    {text:'동일 규모'},
];

export const WEATHER_LIST=[
    {image:require('../../image/weather_cloud.png'), name:'weather_big_cloud'},
    // {image:require('../../image/weather_cloud_wind.png'), name:'weather_cloud_wind'},
    // {image:require('../../image/weather_rain.png'), name:'weather_rain'},
    // {image:require('../../image/weather_small_cloud.png'), name:'weather_small_cloud'},
    // {image:require('../../image/weather_snow.png'), name:'weather_snow'},
    // {image:require('../../image/weather_storm.png'), name:'weather_storm'},
    // {image:require('../../image/weather_sunny.png'), name:'weather_sunny'},
    // {image:require('../../image/weather_wind.png'), name:'weather_wind'},
]

export const EXPEND_TYPE_LIST={
    all:'',
    food:'ET001',
    human:'ET002',
    fixed:'ET003',
    etc:'ET004',
};

export const DAY_LIST_1=[
    {text:'월',code:'HD001'},
    {text:'화',code:'HD002'},
    {text:'수',code:'HD003'},
    {text:'목',code:'HD004'},
    {text:'금',code:'HD005'},
];

export const DAY_LIST_2=[
    {text:'토',code:'HD006'},
    {text:'일',code:'HD007'},
    {text:'공휴일',code:'HD008'},
];

export const LOW_COST_COMP_LIST=[
    {img:require('../../image/cost_lowPrice.png'), title:'저가 전략 (가격 경쟁력)', content:'경쟁자보다 낮은 가격으로 경쟁력을 확보하는 경우'},
    {img:require('../../image/cost_lowOperate.png'), title:'낮은 운영비', content:'임대료(상권 특성 등), 시설비 등의 고정비나 투자비(간편한 조리, 연구의 불필요 등)가 적은 경우'},
    {img:require('../../image/cost_lowService.png'), title:'좁은 서비스 범위', content:'셀프서비스, 키오스크 등, 직접적으로 제공하는 서비스의 범위가 좁은 경우'},
];

export const HIGH_COST_COMP_LIST=[
    {img:require('../../image/cost_highPrice.png'), title:'고가 전략 (차별화된 서비스, 품질)', content:'경쟁자보다 높은 가격으로 경쟁력을 확보하는 경우'},
    {img:require('../../image/cost_highOperate.png'), title:'높은 운영비', content:'임대료(상권 특성 등), 시설비 등의 고정비나 투자비(차별화된 서비스, 품질 등)가 적은 경우'},
    {img:require('../../image/cost_highService.png'), title:'넓은 서비스 범위', content:'직접적으로 제공하는 서비스의 범위가 넓은 경우'},
];

export const HOLIDAY_LIST=[
    {value:0, label:'사용안함'},
    {value:30, label:'30%'},
    {value:50, label:'50%'},
    {value:70, label:'70%'},
    {value:100, label:'100%'},
];

export const EXWHO_LIST=[
    {text:'대표자', code:'EL001'},
    {text:'고용인(직원)', code:'EL002'},
]