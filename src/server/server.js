//Server Environment Setup

var path = require('path')
const express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
const dotenv = require('dotenv');
const { url } = require('inspector');
dotenv.config();

const app = express()
app.use(cors())
// to use json
app.use(bodyParser.json())
// to use url encoded values
app.use(bodyParser.urlencoded({
  extended: true
}))


//Server Listening Folder
app.use(express.static('dist'))
app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})
// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
  console.log('Production app listening on port 8081!')
})



//post trip data to server
let trip=[];
app.post("/posttrip",(req,res)=>{
  trip.push(req.body);
  getGeo()
    .then((position)=>{return getWeather(position)})
    .then((position)=>{return getImg(position)})
    .then((data)=>{
    res.send(data);
    });
});


//get position info
let geoNamesBaseURL = 'http://api.geonames.org/postalCodeSearchJSON?placename=';
let countryCode = [{"name":"Afghanistan","alpha-2":"AF","country-code":"004"},{"name":"Åland Islands","alpha-2":"AX","country-code":"248"},{"name":"Albania","alpha-2":"AL","country-code":"008"},{"name":"Algeria","alpha-2":"DZ","country-code":"012"},{"name":"American Samoa","alpha-2":"AS","country-code":"016"},{"name":"Andorra","alpha-2":"AD","country-code":"020"},{"name":"Angola","alpha-2":"AO","country-code":"024"},{"name":"Anguilla","alpha-2":"AI","country-code":"660"},{"name":"Antarctica","alpha-2":"AQ","country-code":"010"},{"name":"Antigua and Barbuda","alpha-2":"AG","country-code":"028"},{"name":"Argentina","alpha-2":"AR","country-code":"032"},{"name":"Armenia","alpha-2":"AM","country-code":"051"},{"name":"Aruba","alpha-2":"AW","country-code":"533"},{"name":"Australia","alpha-2":"AU","country-code":"036"},{"name":"Austria","alpha-2":"AT","country-code":"040"},{"name":"Azerbaijan","alpha-2":"AZ","country-code":"031"},{"name":"Bahamas","alpha-2":"BS","country-code":"044"},{"name":"Bahrain","alpha-2":"BH","country-code":"048"},{"name":"Bangladesh","alpha-2":"BD","country-code":"050"},{"name":"Barbados","alpha-2":"BB","country-code":"052"},{"name":"Belarus","alpha-2":"BY","country-code":"112"},{"name":"Belgium","alpha-2":"BE","country-code":"056"},{"name":"Belize","alpha-2":"BZ","country-code":"084"},{"name":"Benin","alpha-2":"BJ","country-code":"204"},{"name":"Bermuda","alpha-2":"BM","country-code":"060"},{"name":"Bhutan","alpha-2":"BT","country-code":"064"},{"name":"Bolivia (Plurinational State of)","alpha-2":"BO","country-code":"068"},{"name":"Bonaire, Sint Eustatius and Saba","alpha-2":"BQ","country-code":"535"},{"name":"Bosnia and Herzegovina","alpha-2":"BA","country-code":"070"},{"name":"Botswana","alpha-2":"BW","country-code":"072"},{"name":"Bouvet Island","alpha-2":"BV","country-code":"074"},{"name":"Brazil","alpha-2":"BR","country-code":"076"},{"name":"British Indian Ocean Territory","alpha-2":"IO","country-code":"086"},{"name":"Brunei Darussalam","alpha-2":"BN","country-code":"096"},{"name":"Bulgaria","alpha-2":"BG","country-code":"100"},{"name":"Burkina Faso","alpha-2":"BF","country-code":"854"},{"name":"Burundi","alpha-2":"BI","country-code":"108"},{"name":"Cabo Verde","alpha-2":"CV","country-code":"132"},{"name":"Cambodia","alpha-2":"KH","country-code":"116"},{"name":"Cameroon","alpha-2":"CM","country-code":"120"},{"name":"Canada","alpha-2":"CA","country-code":"124"},{"name":"Cayman Islands","alpha-2":"KY","country-code":"136"},{"name":"Central African Republic","alpha-2":"CF","country-code":"140"},{"name":"Chad","alpha-2":"TD","country-code":"148"},{"name":"Chile","alpha-2":"CL","country-code":"152"},{"name":"China","alpha-2":"CN","country-code":"156"},{"name":"Christmas Island","alpha-2":"CX","country-code":"162"},{"name":"Cocos (Keeling) Islands","alpha-2":"CC","country-code":"166"},{"name":"Colombia","alpha-2":"CO","country-code":"170"},{"name":"Comoros","alpha-2":"KM","country-code":"174"},{"name":"Congo","alpha-2":"CG","country-code":"178"},{"name":"Congo, Democratic Republic of the","alpha-2":"CD","country-code":"180"},{"name":"Cook Islands","alpha-2":"CK","country-code":"184"},{"name":"Costa Rica","alpha-2":"CR","country-code":"188"},{"name":"Côte d'Ivoire","alpha-2":"CI","country-code":"384"},{"name":"Croatia","alpha-2":"HR","country-code":"191"},{"name":"Cuba","alpha-2":"CU","country-code":"192"},{"name":"Curaçao","alpha-2":"CW","country-code":"531"},{"name":"Cyprus","alpha-2":"CY","country-code":"196"},{"name":"Czechia","alpha-2":"CZ","country-code":"203"},{"name":"Denmark","alpha-2":"DK","country-code":"208"},{"name":"Djibouti","alpha-2":"DJ","country-code":"262"},{"name":"Dominica","alpha-2":"DM","country-code":"212"},{"name":"Dominican Republic","alpha-2":"DO","country-code":"214"},{"name":"Ecuador","alpha-2":"EC","country-code":"218"},{"name":"Egypt","alpha-2":"EG","country-code":"818"},{"name":"El Salvador","alpha-2":"SV","country-code":"222"},{"name":"Equatorial Guinea","alpha-2":"GQ","country-code":"226"},{"name":"Eritrea","alpha-2":"ER","country-code":"232"},{"name":"Estonia","alpha-2":"EE","country-code":"233"},{"name":"Eswatini","alpha-2":"SZ","country-code":"748"},{"name":"Ethiopia","alpha-2":"ET","country-code":"231"},{"name":"Falkland Islands (Malvinas)","alpha-2":"FK","country-code":"238"},{"name":"Faroe Islands","alpha-2":"FO","country-code":"234"},{"name":"Fiji","alpha-2":"FJ","country-code":"242"},{"name":"Finland","alpha-2":"FI","country-code":"246"},{"name":"France","alpha-2":"FR","country-code":"250"},{"name":"French Guiana","alpha-2":"GF","country-code":"254"},{"name":"French Polynesia","alpha-2":"PF","country-code":"258"},{"name":"French Southern Territories","alpha-2":"TF","country-code":"260"},{"name":"Gabon","alpha-2":"GA","country-code":"266"},{"name":"Gambia","alpha-2":"GM","country-code":"270"},{"name":"Georgia","alpha-2":"GE","country-code":"268"},{"name":"Germany","alpha-2":"DE","country-code":"276"},{"name":"Ghana","alpha-2":"GH","country-code":"288"},{"name":"Gibraltar","alpha-2":"GI","country-code":"292"},{"name":"Greece","alpha-2":"GR","country-code":"300"},{"name":"Greenland","alpha-2":"GL","country-code":"304"},{"name":"Grenada","alpha-2":"GD","country-code":"308"},{"name":"Guadeloupe","alpha-2":"GP","country-code":"312"},{"name":"Guam","alpha-2":"GU","country-code":"316"},{"name":"Guatemala","alpha-2":"GT","country-code":"320"},{"name":"Guernsey","alpha-2":"GG","country-code":"831"},{"name":"Guinea","alpha-2":"GN","country-code":"324"},{"name":"Guinea-Bissau","alpha-2":"GW","country-code":"624"},{"name":"Guyana","alpha-2":"GY","country-code":"328"},{"name":"Haiti","alpha-2":"HT","country-code":"332"},{"name":"Heard Island and McDonald Islands","alpha-2":"HM","country-code":"334"},{"name":"Holy See","alpha-2":"VA","country-code":"336"},{"name":"Honduras","alpha-2":"HN","country-code":"340"},{"name":"Hong Kong","alpha-2":"HK","country-code":"344"},{"name":"Hungary","alpha-2":"HU","country-code":"348"},{"name":"Iceland","alpha-2":"IS","country-code":"352"},{"name":"India","alpha-2":"IN","country-code":"356"},{"name":"Indonesia","alpha-2":"ID","country-code":"360"},{"name":"Iran (Islamic Republic of)","alpha-2":"IR","country-code":"364"},{"name":"Iraq","alpha-2":"IQ","country-code":"368"},{"name":"Ireland","alpha-2":"IE","country-code":"372"},{"name":"Isle of Man","alpha-2":"IM","country-code":"833"},{"name":"Israel","alpha-2":"IL","country-code":"376"},{"name":"Italy","alpha-2":"IT","country-code":"380"},{"name":"Jamaica","alpha-2":"JM","country-code":"388"},{"name":"Japan","alpha-2":"JP","country-code":"392"},{"name":"Jersey","alpha-2":"JE","country-code":"832"},{"name":"Jordan","alpha-2":"JO","country-code":"400"},{"name":"Kazakhstan","alpha-2":"KZ","country-code":"398"},{"name":"Kenya","alpha-2":"KE","country-code":"404"},{"name":"Kiribati","alpha-2":"KI","country-code":"296"},{"name":"Korea (Democratic People's Republic of)","alpha-2":"KP","country-code":"408"},{"name":"Korea, Republic of","alpha-2":"KR","country-code":"410"},{"name":"Kuwait","alpha-2":"KW","country-code":"414"},{"name":"Kyrgyzstan","alpha-2":"KG","country-code":"417"},{"name":"Lao People's Democratic Republic","alpha-2":"LA","country-code":"418"},{"name":"Latvia","alpha-2":"LV","country-code":"428"},{"name":"Lebanon","alpha-2":"LB","country-code":"422"},{"name":"Lesotho","alpha-2":"LS","country-code":"426"},{"name":"Liberia","alpha-2":"LR","country-code":"430"},{"name":"Libya","alpha-2":"LY","country-code":"434"},{"name":"Liechtenstein","alpha-2":"LI","country-code":"438"},{"name":"Lithuania","alpha-2":"LT","country-code":"440"},{"name":"Luxembourg","alpha-2":"LU","country-code":"442"},{"name":"Macao","alpha-2":"MO","country-code":"446"},{"name":"Madagascar","alpha-2":"MG","country-code":"450"},{"name":"Malawi","alpha-2":"MW","country-code":"454"},{"name":"Malaysia","alpha-2":"MY","country-code":"458"},{"name":"Maldives","alpha-2":"MV","country-code":"462"},{"name":"Mali","alpha-2":"ML","country-code":"466"},{"name":"Malta","alpha-2":"MT","country-code":"470"},{"name":"Marshall Islands","alpha-2":"MH","country-code":"584"},{"name":"Martinique","alpha-2":"MQ","country-code":"474"},{"name":"Mauritania","alpha-2":"MR","country-code":"478"},{"name":"Mauritius","alpha-2":"MU","country-code":"480"},{"name":"Mayotte","alpha-2":"YT","country-code":"175"},{"name":"Mexico","alpha-2":"MX","country-code":"484"},{"name":"Micronesia (Federated States of)","alpha-2":"FM","country-code":"583"},{"name":"Moldova, Republic of","alpha-2":"MD","country-code":"498"},{"name":"Monaco","alpha-2":"MC","country-code":"492"},{"name":"Mongolia","alpha-2":"MN","country-code":"496"},{"name":"Montenegro","alpha-2":"ME","country-code":"499"},{"name":"Montserrat","alpha-2":"MS","country-code":"500"},{"name":"Morocco","alpha-2":"MA","country-code":"504"},{"name":"Mozambique","alpha-2":"MZ","country-code":"508"},{"name":"Myanmar","alpha-2":"MM","country-code":"104"},{"name":"Namibia","alpha-2":"NA","country-code":"516"},{"name":"Nauru","alpha-2":"NR","country-code":"520"},{"name":"Nepal","alpha-2":"NP","country-code":"524"},{"name":"Netherlands","alpha-2":"NL","country-code":"528"},{"name":"New Caledonia","alpha-2":"NC","country-code":"540"},{"name":"New Zealand","alpha-2":"NZ","country-code":"554"},{"name":"Nicaragua","alpha-2":"NI","country-code":"558"},{"name":"Niger","alpha-2":"NE","country-code":"562"},{"name":"Nigeria","alpha-2":"NG","country-code":"566"},{"name":"Niue","alpha-2":"NU","country-code":"570"},{"name":"Norfolk Island","alpha-2":"NF","country-code":"574"},{"name":"North Macedonia","alpha-2":"MK","country-code":"807"},{"name":"Northern Mariana Islands","alpha-2":"MP","country-code":"580"},{"name":"Norway","alpha-2":"NO","country-code":"578"},{"name":"Oman","alpha-2":"OM","country-code":"512"},{"name":"Pakistan","alpha-2":"PK","country-code":"586"},{"name":"Palau","alpha-2":"PW","country-code":"585"},{"name":"Palestine, State of","alpha-2":"PS","country-code":"275"},{"name":"Panama","alpha-2":"PA","country-code":"591"},{"name":"Papua New Guinea","alpha-2":"PG","country-code":"598"},{"name":"Paraguay","alpha-2":"PY","country-code":"600"},{"name":"Peru","alpha-2":"PE","country-code":"604"},{"name":"Philippines","alpha-2":"PH","country-code":"608"},{"name":"Pitcairn","alpha-2":"PN","country-code":"612"},{"name":"Poland","alpha-2":"PL","country-code":"616"},{"name":"Portugal","alpha-2":"PT","country-code":"620"},{"name":"Puerto Rico","alpha-2":"PR","country-code":"630"},{"name":"Qatar","alpha-2":"QA","country-code":"634"},{"name":"Réunion","alpha-2":"RE","country-code":"638"},{"name":"Romania","alpha-2":"RO","country-code":"642"},{"name":"Russian Federation","alpha-2":"RU","country-code":"643"},{"name":"Rwanda","alpha-2":"RW","country-code":"646"},{"name":"Saint Barthélemy","alpha-2":"BL","country-code":"652"},{"name":"Saint Helena, Ascension and Tristan da Cunha","alpha-2":"SH","country-code":"654"},{"name":"Saint Kitts and Nevis","alpha-2":"KN","country-code":"659"},{"name":"Saint Lucia","alpha-2":"LC","country-code":"662"},{"name":"Saint Martin (French part)","alpha-2":"MF","country-code":"663"},{"name":"Saint Pierre and Miquelon","alpha-2":"PM","country-code":"666"},{"name":"Saint Vincent and the Grenadines","alpha-2":"VC","country-code":"670"},{"name":"Samoa","alpha-2":"WS","country-code":"882"},{"name":"San Marino","alpha-2":"SM","country-code":"674"},{"name":"Sao Tome and Principe","alpha-2":"ST","country-code":"678"},{"name":"Saudi Arabia","alpha-2":"SA","country-code":"682"},{"name":"Senegal","alpha-2":"SN","country-code":"686"},{"name":"Serbia","alpha-2":"RS","country-code":"688"},{"name":"Seychelles","alpha-2":"SC","country-code":"690"},{"name":"Sierra Leone","alpha-2":"SL","country-code":"694"},{"name":"Singapore","alpha-2":"SG","country-code":"702"},{"name":"Sint Maarten (Dutch part)","alpha-2":"SX","country-code":"534"},{"name":"Slovakia","alpha-2":"SK","country-code":"703"},{"name":"Slovenia","alpha-2":"SI","country-code":"705"},{"name":"Solomon Islands","alpha-2":"SB","country-code":"090"},{"name":"Somalia","alpha-2":"SO","country-code":"706"},{"name":"South Africa","alpha-2":"ZA","country-code":"710"},{"name":"South Georgia and the South Sandwich Islands","alpha-2":"GS","country-code":"239"},{"name":"South Sudan","alpha-2":"SS","country-code":"728"},{"name":"Spain","alpha-2":"ES","country-code":"724"},{"name":"Sri Lanka","alpha-2":"LK","country-code":"144"},{"name":"Sudan","alpha-2":"SD","country-code":"729"},{"name":"Suriname","alpha-2":"SR","country-code":"740"},{"name":"Svalbard and Jan Mayen","alpha-2":"SJ","country-code":"744"},{"name":"Sweden","alpha-2":"SE","country-code":"752"},{"name":"Switzerland","alpha-2":"CH","country-code":"756"},{"name":"Syrian Arab Republic","alpha-2":"SY","country-code":"760"},{"name":"Taiwan, Province of China","alpha-2":"TW","country-code":"158"},{"name":"Tajikistan","alpha-2":"TJ","country-code":"762"},{"name":"Tanzania, United Republic of","alpha-2":"TZ","country-code":"834"},{"name":"Thailand","alpha-2":"TH","country-code":"764"},{"name":"Timor-Leste","alpha-2":"TL","country-code":"626"},{"name":"Togo","alpha-2":"TG","country-code":"768"},{"name":"Tokelau","alpha-2":"TK","country-code":"772"},{"name":"Tonga","alpha-2":"TO","country-code":"776"},{"name":"Trinidad and Tobago","alpha-2":"TT","country-code":"780"},{"name":"Tunisia","alpha-2":"TN","country-code":"788"},{"name":"Turkey","alpha-2":"TR","country-code":"792"},{"name":"Turkmenistan","alpha-2":"TM","country-code":"795"},{"name":"Turks and Caicos Islands","alpha-2":"TC","country-code":"796"},{"name":"Tuvalu","alpha-2":"TV","country-code":"798"},{"name":"Uganda","alpha-2":"UG","country-code":"800"},{"name":"Ukraine","alpha-2":"UA","country-code":"804"},{"name":"United Arab Emirates","alpha-2":"AE","country-code":"784"},{"name":"United Kingdom of Great Britain and Northern Ireland","alpha-2":"GB","country-code":"826"},{"name":"United States of America","alpha-2":"US","country-code":"840"},{"name":"Us","alpha-2":"US","country-code":"840"},{"name":"us","alpha-2":"US","country-code":"840"},{"name":"America","alpha-2":"US","country-code":"840"},{"name":"United States Minor Outlying Islands","alpha-2":"UM","country-code":"581"},{"name":"Uruguay","alpha-2":"UY","country-code":"858"},{"name":"Uzbekistan","alpha-2":"UZ","country-code":"860"},{"name":"Vanuatu","alpha-2":"VU","country-code":"548"},{"name":"Venezuela (Bolivarian Republic of)","alpha-2":"VE","country-code":"862"},{"name":"Viet Nam","alpha-2":"VN","country-code":"704"},{"name":"Virgin Islands (British)","alpha-2":"VG","country-code":"092"},{"name":"Virgin Islands (U.S.)","alpha-2":"VI","country-code":"850"},{"name":"Wallis and Futuna","alpha-2":"WF","country-code":"876"},{"name":"Western Sahara","alpha-2":"EH","country-code":"732"},{"name":"Yemen","alpha-2":"YE","country-code":"887"},{"name":"Zambia","alpha-2":"ZM","country-code":"894"},{"name":"Zimbabwe","alpha-2":"ZW","country-code":"716"}];
   
//upperCase First Letter for input
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
//testing function
module.exports = function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};


async function getGeo(){
  let username = `&username=${process.env.GEO_USER}`;
  let placename = trip.slice(trip.length-1)[0].Destination;
  let countryname = trip.slice(trip.length-1)[0].Country;
  let arrivaldate = trip.slice(trip.length-1)[0].Date;
  let arrivaltime = trip.slice(trip.length-1)[0].Time;
  let flight = trip.slice(trip.length-1)[0].Flight;
  
 

  let foundCountryCode = countryCode.filter((item)=>{ 
    if (item.name === capitalizeFirstLetter(countryname)) {
      return item;
    }
  })[0]['alpha-2']; 
    //find country code for the input country

  let response = await fetch(geoNamesBaseURL+placename+`&country=${foundCountryCode}`+username);
  try {
    let data = await response.json();
    let lat = data.postalCodes[0].lat.toFixed(3);
    let lon = data.postalCodes[0].lng.toFixed(3);
    return {'lat':lat,'lon':lon,'date':arrivaldate,'placename':placename,'country':countryname,'time':arrivaltime,'flight':flight};
  } catch(error){
    console.log('error',error);
  }
}

//get weather data [chain2]
let weatherBitBaseURL = 'https://api.weatherbit.io/v2.0/forecast/daily?';
async function getWeather(position){
    
    let {lat,lon,date,placename,country,time,flight} = position;
    //check date differences
    let targetdate = new Date(date);
    let today = new Date();
    let difference = Math.ceil((targetdate.getTime()-today.getTime())/1000/3600/24);
    if (difference >= 7) {
      difference = 7;
    } else if (difference <= 0) {
      difference = 0;
    };
    let response = await fetch(`${weatherBitBaseURL}&lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_TRIAL}`);
    try {
    let datasource = await response.json();
    let maxTemp = datasource.data[difference]['max_temp'];
      let minTemp = datasource.data[difference]['min_temp'];
      let sunrise = convertTimeStamp(datasource.data[difference]['sunrise_ts']);
      let sunset = convertTimeStamp(datasource.data[difference]['sunset_ts']);
      let weather = datasource.data[difference].weather.icon;
      let description = datasource.data[difference].weather.description;
    
    let minimizedData = {
      'max_temp':maxTemp,
      'min_temp':minTemp,
      'sunrise':sunrise,
      'sunset':sunset,
      'weathericon':weather,
      'arrivaldate':date,
      'time':time,
      'placename':placename,
      'country':country,
      'flight':flight,
      'description':description,
    };
    return minimizedData;
    }catch(error){
    console.log('error',error);
  };
}

//convert time stamp
function convertTimeStamp(timestamp){
  let date = new Date(timestamp * 1000);
  let hours = date.getHours();
  let minutes = "0" + date.getMinutes();
  let seconds = "0" + date.getSeconds();
  let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
  return formattedTime;
  }


//get photo from pixabay [chain 3]
let pixabayURL = 'https://pixabay.com/api/?key=';
async function getImg(position){
  let {max_temp,min_temp,sunrise,sunset,weathericon,arrivaldate,time,placename,country,flight,description} = position;
  let response = await fetch(`${pixabayURL}${process.env.PIXABAY_API}&q=${placename}&image_type=photo`)
  try {
    let data = await response.json();
    return {
      'max_temp':max_temp,
      'min_temp':min_temp,
      'sunrise':sunrise,
      'sunset':sunset,
      'weathericon':weathericon,
      'arrivaldate':arrivaldate,
      'time':time,
      'placename':placename,
      'country':country,
      'flight':flight,
      'description':description,
      'img':data.hits[0].webformatURL,
    };
  } catch(error) {
    console.log('error',error);
  }

}