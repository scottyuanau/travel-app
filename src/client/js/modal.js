import { postData } from "./comm";
//add new destination modal
let modal = document.getElementById("addNewDestination");

window.addEventListener('click',(event)=>{
    if (event.target.className == 'newDestination' || event.target.id == 'homeadd') {
        modal.style.display = "block";
      } else if (event.target.className == 'close') {
        modal.style.display = "none";
      } else if (event.target == modal) {
        modal.style.display = "none";
      }
})

//add trip button on the modal
document.querySelector('#modaladdtrip').addEventListener('click',(event)=>{
    event.preventDefault();
    document.querySelector('#modaladdtrip').textContent = 'Adding...'; //change button text when submitted
    let destination = document.querySelector('#destination').value;
    let country = document.querySelector('#country').value;
    let arrivaldate = document.querySelector('#arrivaldate').value;
    let arrivaltime = document.querySelector('#arrivaltime').value;
    let flight = document.querySelector('#flight').value;

    //form validation
    let countryCode = [{"name":"Afghanistan","alpha-2":"AF","country-code":"004"},{"name":"Åland Islands","alpha-2":"AX","country-code":"248"},{"name":"Albania","alpha-2":"AL","country-code":"008"},{"name":"Algeria","alpha-2":"DZ","country-code":"012"},{"name":"American Samoa","alpha-2":"AS","country-code":"016"},{"name":"Andorra","alpha-2":"AD","country-code":"020"},{"name":"Angola","alpha-2":"AO","country-code":"024"},{"name":"Anguilla","alpha-2":"AI","country-code":"660"},{"name":"Antarctica","alpha-2":"AQ","country-code":"010"},{"name":"Antigua and Barbuda","alpha-2":"AG","country-code":"028"},{"name":"Argentina","alpha-2":"AR","country-code":"032"},{"name":"Armenia","alpha-2":"AM","country-code":"051"},{"name":"Aruba","alpha-2":"AW","country-code":"533"},{"name":"Australia","alpha-2":"AU","country-code":"036"},{"name":"Austria","alpha-2":"AT","country-code":"040"},{"name":"Azerbaijan","alpha-2":"AZ","country-code":"031"},{"name":"Bahamas","alpha-2":"BS","country-code":"044"},{"name":"Bahrain","alpha-2":"BH","country-code":"048"},{"name":"Bangladesh","alpha-2":"BD","country-code":"050"},{"name":"Barbados","alpha-2":"BB","country-code":"052"},{"name":"Belarus","alpha-2":"BY","country-code":"112"},{"name":"Belgium","alpha-2":"BE","country-code":"056"},{"name":"Belize","alpha-2":"BZ","country-code":"084"},{"name":"Benin","alpha-2":"BJ","country-code":"204"},{"name":"Bermuda","alpha-2":"BM","country-code":"060"},{"name":"Bhutan","alpha-2":"BT","country-code":"064"},{"name":"Bolivia (Plurinational State of)","alpha-2":"BO","country-code":"068"},{"name":"Bonaire, Sint Eustatius and Saba","alpha-2":"BQ","country-code":"535"},{"name":"Bosnia and Herzegovina","alpha-2":"BA","country-code":"070"},{"name":"Botswana","alpha-2":"BW","country-code":"072"},{"name":"Bouvet Island","alpha-2":"BV","country-code":"074"},{"name":"Brazil","alpha-2":"BR","country-code":"076"},{"name":"British Indian Ocean Territory","alpha-2":"IO","country-code":"086"},{"name":"Brunei Darussalam","alpha-2":"BN","country-code":"096"},{"name":"Bulgaria","alpha-2":"BG","country-code":"100"},{"name":"Burkina Faso","alpha-2":"BF","country-code":"854"},{"name":"Burundi","alpha-2":"BI","country-code":"108"},{"name":"Cabo Verde","alpha-2":"CV","country-code":"132"},{"name":"Cambodia","alpha-2":"KH","country-code":"116"},{"name":"Cameroon","alpha-2":"CM","country-code":"120"},{"name":"Canada","alpha-2":"CA","country-code":"124"},{"name":"Cayman Islands","alpha-2":"KY","country-code":"136"},{"name":"Central African Republic","alpha-2":"CF","country-code":"140"},{"name":"Chad","alpha-2":"TD","country-code":"148"},{"name":"Chile","alpha-2":"CL","country-code":"152"},{"name":"China","alpha-2":"CN","country-code":"156"},{"name":"Christmas Island","alpha-2":"CX","country-code":"162"},{"name":"Cocos (Keeling) Islands","alpha-2":"CC","country-code":"166"},{"name":"Colombia","alpha-2":"CO","country-code":"170"},{"name":"Comoros","alpha-2":"KM","country-code":"174"},{"name":"Congo","alpha-2":"CG","country-code":"178"},{"name":"Congo, Democratic Republic of the","alpha-2":"CD","country-code":"180"},{"name":"Cook Islands","alpha-2":"CK","country-code":"184"},{"name":"Costa Rica","alpha-2":"CR","country-code":"188"},{"name":"Côte d'Ivoire","alpha-2":"CI","country-code":"384"},{"name":"Croatia","alpha-2":"HR","country-code":"191"},{"name":"Cuba","alpha-2":"CU","country-code":"192"},{"name":"Curaçao","alpha-2":"CW","country-code":"531"},{"name":"Cyprus","alpha-2":"CY","country-code":"196"},{"name":"Czechia","alpha-2":"CZ","country-code":"203"},{"name":"Denmark","alpha-2":"DK","country-code":"208"},{"name":"Djibouti","alpha-2":"DJ","country-code":"262"},{"name":"Dominica","alpha-2":"DM","country-code":"212"},{"name":"Dominican Republic","alpha-2":"DO","country-code":"214"},{"name":"Ecuador","alpha-2":"EC","country-code":"218"},{"name":"Egypt","alpha-2":"EG","country-code":"818"},{"name":"El Salvador","alpha-2":"SV","country-code":"222"},{"name":"Equatorial Guinea","alpha-2":"GQ","country-code":"226"},{"name":"Eritrea","alpha-2":"ER","country-code":"232"},{"name":"Estonia","alpha-2":"EE","country-code":"233"},{"name":"Eswatini","alpha-2":"SZ","country-code":"748"},{"name":"Ethiopia","alpha-2":"ET","country-code":"231"},{"name":"Falkland Islands (Malvinas)","alpha-2":"FK","country-code":"238"},{"name":"Faroe Islands","alpha-2":"FO","country-code":"234"},{"name":"Fiji","alpha-2":"FJ","country-code":"242"},{"name":"Finland","alpha-2":"FI","country-code":"246"},{"name":"France","alpha-2":"FR","country-code":"250"},{"name":"French Guiana","alpha-2":"GF","country-code":"254"},{"name":"French Polynesia","alpha-2":"PF","country-code":"258"},{"name":"French Southern Territories","alpha-2":"TF","country-code":"260"},{"name":"Gabon","alpha-2":"GA","country-code":"266"},{"name":"Gambia","alpha-2":"GM","country-code":"270"},{"name":"Georgia","alpha-2":"GE","country-code":"268"},{"name":"Germany","alpha-2":"DE","country-code":"276"},{"name":"Ghana","alpha-2":"GH","country-code":"288"},{"name":"Gibraltar","alpha-2":"GI","country-code":"292"},{"name":"Greece","alpha-2":"GR","country-code":"300"},{"name":"Greenland","alpha-2":"GL","country-code":"304"},{"name":"Grenada","alpha-2":"GD","country-code":"308"},{"name":"Guadeloupe","alpha-2":"GP","country-code":"312"},{"name":"Guam","alpha-2":"GU","country-code":"316"},{"name":"Guatemala","alpha-2":"GT","country-code":"320"},{"name":"Guernsey","alpha-2":"GG","country-code":"831"},{"name":"Guinea","alpha-2":"GN","country-code":"324"},{"name":"Guinea-Bissau","alpha-2":"GW","country-code":"624"},{"name":"Guyana","alpha-2":"GY","country-code":"328"},{"name":"Haiti","alpha-2":"HT","country-code":"332"},{"name":"Heard Island and McDonald Islands","alpha-2":"HM","country-code":"334"},{"name":"Holy See","alpha-2":"VA","country-code":"336"},{"name":"Honduras","alpha-2":"HN","country-code":"340"},{"name":"Hong Kong","alpha-2":"HK","country-code":"344"},{"name":"Hungary","alpha-2":"HU","country-code":"348"},{"name":"Iceland","alpha-2":"IS","country-code":"352"},{"name":"India","alpha-2":"IN","country-code":"356"},{"name":"Indonesia","alpha-2":"ID","country-code":"360"},{"name":"Iran (Islamic Republic of)","alpha-2":"IR","country-code":"364"},{"name":"Iraq","alpha-2":"IQ","country-code":"368"},{"name":"Ireland","alpha-2":"IE","country-code":"372"},{"name":"Isle of Man","alpha-2":"IM","country-code":"833"},{"name":"Israel","alpha-2":"IL","country-code":"376"},{"name":"Italy","alpha-2":"IT","country-code":"380"},{"name":"Jamaica","alpha-2":"JM","country-code":"388"},{"name":"Japan","alpha-2":"JP","country-code":"392"},{"name":"Jersey","alpha-2":"JE","country-code":"832"},{"name":"Jordan","alpha-2":"JO","country-code":"400"},{"name":"Kazakhstan","alpha-2":"KZ","country-code":"398"},{"name":"Kenya","alpha-2":"KE","country-code":"404"},{"name":"Kiribati","alpha-2":"KI","country-code":"296"},{"name":"Korea (Democratic People's Republic of)","alpha-2":"KP","country-code":"408"},{"name":"Korea, Republic of","alpha-2":"KR","country-code":"410"},{"name":"Kuwait","alpha-2":"KW","country-code":"414"},{"name":"Kyrgyzstan","alpha-2":"KG","country-code":"417"},{"name":"Lao People's Democratic Republic","alpha-2":"LA","country-code":"418"},{"name":"Latvia","alpha-2":"LV","country-code":"428"},{"name":"Lebanon","alpha-2":"LB","country-code":"422"},{"name":"Lesotho","alpha-2":"LS","country-code":"426"},{"name":"Liberia","alpha-2":"LR","country-code":"430"},{"name":"Libya","alpha-2":"LY","country-code":"434"},{"name":"Liechtenstein","alpha-2":"LI","country-code":"438"},{"name":"Lithuania","alpha-2":"LT","country-code":"440"},{"name":"Luxembourg","alpha-2":"LU","country-code":"442"},{"name":"Macao","alpha-2":"MO","country-code":"446"},{"name":"Madagascar","alpha-2":"MG","country-code":"450"},{"name":"Malawi","alpha-2":"MW","country-code":"454"},{"name":"Malaysia","alpha-2":"MY","country-code":"458"},{"name":"Maldives","alpha-2":"MV","country-code":"462"},{"name":"Mali","alpha-2":"ML","country-code":"466"},{"name":"Malta","alpha-2":"MT","country-code":"470"},{"name":"Marshall Islands","alpha-2":"MH","country-code":"584"},{"name":"Martinique","alpha-2":"MQ","country-code":"474"},{"name":"Mauritania","alpha-2":"MR","country-code":"478"},{"name":"Mauritius","alpha-2":"MU","country-code":"480"},{"name":"Mayotte","alpha-2":"YT","country-code":"175"},{"name":"Mexico","alpha-2":"MX","country-code":"484"},{"name":"Micronesia (Federated States of)","alpha-2":"FM","country-code":"583"},{"name":"Moldova, Republic of","alpha-2":"MD","country-code":"498"},{"name":"Monaco","alpha-2":"MC","country-code":"492"},{"name":"Mongolia","alpha-2":"MN","country-code":"496"},{"name":"Montenegro","alpha-2":"ME","country-code":"499"},{"name":"Montserrat","alpha-2":"MS","country-code":"500"},{"name":"Morocco","alpha-2":"MA","country-code":"504"},{"name":"Mozambique","alpha-2":"MZ","country-code":"508"},{"name":"Myanmar","alpha-2":"MM","country-code":"104"},{"name":"Namibia","alpha-2":"NA","country-code":"516"},{"name":"Nauru","alpha-2":"NR","country-code":"520"},{"name":"Nepal","alpha-2":"NP","country-code":"524"},{"name":"Netherlands","alpha-2":"NL","country-code":"528"},{"name":"New Caledonia","alpha-2":"NC","country-code":"540"},{"name":"New Zealand","alpha-2":"NZ","country-code":"554"},{"name":"Nicaragua","alpha-2":"NI","country-code":"558"},{"name":"Niger","alpha-2":"NE","country-code":"562"},{"name":"Nigeria","alpha-2":"NG","country-code":"566"},{"name":"Niue","alpha-2":"NU","country-code":"570"},{"name":"Norfolk Island","alpha-2":"NF","country-code":"574"},{"name":"North Macedonia","alpha-2":"MK","country-code":"807"},{"name":"Northern Mariana Islands","alpha-2":"MP","country-code":"580"},{"name":"Norway","alpha-2":"NO","country-code":"578"},{"name":"Oman","alpha-2":"OM","country-code":"512"},{"name":"Pakistan","alpha-2":"PK","country-code":"586"},{"name":"Palau","alpha-2":"PW","country-code":"585"},{"name":"Palestine, State of","alpha-2":"PS","country-code":"275"},{"name":"Panama","alpha-2":"PA","country-code":"591"},{"name":"Papua New Guinea","alpha-2":"PG","country-code":"598"},{"name":"Paraguay","alpha-2":"PY","country-code":"600"},{"name":"Peru","alpha-2":"PE","country-code":"604"},{"name":"Philippines","alpha-2":"PH","country-code":"608"},{"name":"Pitcairn","alpha-2":"PN","country-code":"612"},{"name":"Poland","alpha-2":"PL","country-code":"616"},{"name":"Portugal","alpha-2":"PT","country-code":"620"},{"name":"Puerto Rico","alpha-2":"PR","country-code":"630"},{"name":"Qatar","alpha-2":"QA","country-code":"634"},{"name":"Réunion","alpha-2":"RE","country-code":"638"},{"name":"Romania","alpha-2":"RO","country-code":"642"},{"name":"Russian Federation","alpha-2":"RU","country-code":"643"},{"name":"Rwanda","alpha-2":"RW","country-code":"646"},{"name":"Saint Barthélemy","alpha-2":"BL","country-code":"652"},{"name":"Saint Helena, Ascension and Tristan da Cunha","alpha-2":"SH","country-code":"654"},{"name":"Saint Kitts and Nevis","alpha-2":"KN","country-code":"659"},{"name":"Saint Lucia","alpha-2":"LC","country-code":"662"},{"name":"Saint Martin (French part)","alpha-2":"MF","country-code":"663"},{"name":"Saint Pierre and Miquelon","alpha-2":"PM","country-code":"666"},{"name":"Saint Vincent and the Grenadines","alpha-2":"VC","country-code":"670"},{"name":"Samoa","alpha-2":"WS","country-code":"882"},{"name":"San Marino","alpha-2":"SM","country-code":"674"},{"name":"Sao Tome and Principe","alpha-2":"ST","country-code":"678"},{"name":"Saudi Arabia","alpha-2":"SA","country-code":"682"},{"name":"Senegal","alpha-2":"SN","country-code":"686"},{"name":"Serbia","alpha-2":"RS","country-code":"688"},{"name":"Seychelles","alpha-2":"SC","country-code":"690"},{"name":"Sierra Leone","alpha-2":"SL","country-code":"694"},{"name":"Singapore","alpha-2":"SG","country-code":"702"},{"name":"Sint Maarten (Dutch part)","alpha-2":"SX","country-code":"534"},{"name":"Slovakia","alpha-2":"SK","country-code":"703"},{"name":"Slovenia","alpha-2":"SI","country-code":"705"},{"name":"Solomon Islands","alpha-2":"SB","country-code":"090"},{"name":"Somalia","alpha-2":"SO","country-code":"706"},{"name":"South Africa","alpha-2":"ZA","country-code":"710"},{"name":"South Georgia and the South Sandwich Islands","alpha-2":"GS","country-code":"239"},{"name":"South Sudan","alpha-2":"SS","country-code":"728"},{"name":"Spain","alpha-2":"ES","country-code":"724"},{"name":"Sri Lanka","alpha-2":"LK","country-code":"144"},{"name":"Sudan","alpha-2":"SD","country-code":"729"},{"name":"Suriname","alpha-2":"SR","country-code":"740"},{"name":"Svalbard and Jan Mayen","alpha-2":"SJ","country-code":"744"},{"name":"Sweden","alpha-2":"SE","country-code":"752"},{"name":"Switzerland","alpha-2":"CH","country-code":"756"},{"name":"Syrian Arab Republic","alpha-2":"SY","country-code":"760"},{"name":"Taiwan, Province of China","alpha-2":"TW","country-code":"158"},{"name":"Tajikistan","alpha-2":"TJ","country-code":"762"},{"name":"Tanzania, United Republic of","alpha-2":"TZ","country-code":"834"},{"name":"Thailand","alpha-2":"TH","country-code":"764"},{"name":"Timor-Leste","alpha-2":"TL","country-code":"626"},{"name":"Togo","alpha-2":"TG","country-code":"768"},{"name":"Tokelau","alpha-2":"TK","country-code":"772"},{"name":"Tonga","alpha-2":"TO","country-code":"776"},{"name":"Trinidad and Tobago","alpha-2":"TT","country-code":"780"},{"name":"Tunisia","alpha-2":"TN","country-code":"788"},{"name":"Turkey","alpha-2":"TR","country-code":"792"},{"name":"Turkmenistan","alpha-2":"TM","country-code":"795"},{"name":"Turks and Caicos Islands","alpha-2":"TC","country-code":"796"},{"name":"Tuvalu","alpha-2":"TV","country-code":"798"},{"name":"Uganda","alpha-2":"UG","country-code":"800"},{"name":"Ukraine","alpha-2":"UA","country-code":"804"},{"name":"United Arab Emirates","alpha-2":"AE","country-code":"784"},{"name":"United Kingdom of Great Britain and Northern Ireland","alpha-2":"GB","country-code":"826"},{"name":"United States of America","alpha-2":"US","country-code":"840"},{"name":"Us","alpha-2":"US","country-code":"840"},{"name":"us","alpha-2":"US","country-code":"840"},{"name":"America","alpha-2":"US","country-code":"840"},{"name":"United States Minor Outlying Islands","alpha-2":"UM","country-code":"581"},{"name":"Uruguay","alpha-2":"UY","country-code":"858"},{"name":"Uzbekistan","alpha-2":"UZ","country-code":"860"},{"name":"Vanuatu","alpha-2":"VU","country-code":"548"},{"name":"Venezuela (Bolivarian Republic of)","alpha-2":"VE","country-code":"862"},{"name":"Viet Nam","alpha-2":"VN","country-code":"704"},{"name":"Virgin Islands (British)","alpha-2":"VG","country-code":"092"},{"name":"Virgin Islands (U.S.)","alpha-2":"VI","country-code":"850"},{"name":"Wallis and Futuna","alpha-2":"WF","country-code":"876"},{"name":"Western Sahara","alpha-2":"EH","country-code":"732"},{"name":"Yemen","alpha-2":"YE","country-code":"887"},{"name":"Zambia","alpha-2":"ZM","country-code":"894"},{"name":"Zimbabwe","alpha-2":"ZW","country-code":"716"}];
    let countrytest = countryCode.filter((item)=>{return item.name === capitalizeFirstLetter(country)});
    if (countrytest.length===0) {
      alert('please input correct country name')
    } else if (countrytest.length===1) {
    
    //form submission
    postData('/posttrip',{
      'Destination': destination,
      'Country':country,
      'Date':arrivaldate,
      'Time':arrivaltime,
      'Flight':flight,
    }).then((data)=>{return updateUI(data)})
      .then(
      ()=>{
        document.querySelector('#modaladdtrip').innerHTML='<i class="fa-solid fa-plus"></i> Add'
        return modal.style.display = "none"} //close modal after completes
    )}
})

//update UI
const updateUI = async (data)=>{
  let {arrivaldate,country,description,flight,img,max_temp,min_temp,placename,sunrise,sunset,time,weathericon} = data;
  let newTrip = document.createElement('div');
  newTrip.classList.add('newtrip');

  let leftCol = document.createElement('div');
  leftCol.classList.add('leftcol');
  let rightCol = document.createElement('div');
  rightCol.classList.add('rightcol');

  //contents of left column
    //images
    let previewImg = document.createElement('img');
    previewImg.setAttribute('src',img);
    previewImg.setAttribute('alt',`${placename}`);
    leftCol.appendChild(previewImg);

    //buttons
    let buttonRow = document.createElement('div');
    buttonRow.classList.add('buttonrow');
    //todo button
    let todoButton = document.createElement('button');
    todoButton.innerHTML = '<i class="far fa-calendar-check"></i> Todo';
    buttonRow.appendChild(todoButton);
    //notes button
    let notesButton = document.createElement('button');
    notesButton.innerHTML = '<i class="far fa-sticky-note"></i> Notes';
    buttonRow.appendChild(notesButton);
    //packing button
    let packingButton = document.createElement('button');
    packingButton.innerHTML = '<i class="fas fa-box"></i> Packing';
    buttonRow.appendChild(packingButton);
    
    leftCol.appendChild(buttonRow);


    


  //contents of right column

    //add heading
    let h2 = document.createElement('h2');
    h2.textContent = `${capitalizeFirstLetter(placename)}, ${country.toUpperCase()}`;
    rightCol.appendChild(h2);
    let row1 = document.createElement('div');

    //add arrival date & time
    row1.classList.add('row');
    let datentime = document.createElement('span');
    datentime.innerText = `${arrivaldate}@${time}`;
    row1.appendChild(datentime);
    
    //check date differences
    let date1 = new Date(arrivaldate);
    let today = new Date();
    let difference = Math.ceil((date1.getTime()-today.getTime())/1000/3600/24);
    let daytext = 'days';
    if (difference == 1) {
      daytext = 'day';
    }
    let timeLeft = document.createElement('span');
    timeLeft.classList.add('timeleft');
    timeLeft.innerText = `${difference} ${daytext}  away`;
    row1.appendChild(timeLeft);

    rightCol.appendChild(row1);

    //flight info
    let flightinfo = document.createElement('div');
    flightinfo.classList.add('flightinfo');
    let flightrow1 = document.createElement('div');
    flightrow1.classList.add('flightrow1');
    let flightrow2 = document.createElement('div');
    flightrow2.classList.add('flightrow2');
    let dateheading = document.createElement('span');
    dateheading.innerText = 'Date';
    let destinationheading = document.createElement('span');
    destinationheading.innerText = 'Destination';
    let flightheading = document.createElement('span');
    flightheading.innerText = 'Flight';
    flightrow1.appendChild(dateheading);
    flightrow1.appendChild(destinationheading);
    flightrow1.appendChild(flightheading);

    let datecontent = document.createElement('span');
    datecontent.innerText=`${arrivaldate}`;
    let destinationcontent = document.createElement('span');
    destinationcontent.innerText=`${country.toUpperCase()}`;
    let flightcontent = document.createElement('span');
    flightcontent.innerText=`${flight}`;
    flightrow2.appendChild(datecontent);
    flightrow2.appendChild(destinationcontent);
    flightrow2.appendChild(flightcontent);

    flightinfo.appendChild(flightrow1);
    flightinfo.appendChild(flightrow2);

    rightCol.appendChild(flightinfo);

    //weather info 
      //weather icon
    let weatherrow = document.createElement('div');
    weatherrow.classList.add('weatherrow');
    // let weatherimg = document.createElement('img');
    // weatherimg.setAttribute('src',`https://www.weatherbit.io/static/img/icons/${weathericon}.png`);
    // weatherimg.setAttribute('alt','weather icon');
      //high and low temp
    let temphighlow = document.createElement('span');
    temphighlow.innerHTML = `<img src='https://www.weatherbit.io/static/img/icons/${weathericon}.png' alt='weather icon'> ${min_temp}ºC - ${max_temp}ºC`;
      //sunrise
    let sunriseinfo = document.createElement('span');
    sunriseinfo.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 17.79"><path d="M10.01,10.05c.98-.67,1.96-1.35,2.94-2.02,.04-.03,.09-.06,.13-.09,.45-.29,.84-.12,.94,.41,.21,1.15,.43,2.31,.64,3.46,.03,.15,.09,.21,.23,.23,1.12,.2,2.23,.41,3.35,.61,.05,0,.09,.02,.14,.03,.53,.12,.68,.5,.37,.95-.28,.42-.56,.83-.86,1.24-.06,.08-.18,.14-.28,.14-1.05,0-2.1,0-3.15,.01-.22,0-.33-.06-.43-.27-.63-1.26-1.62-2.09-3.01-2.39-2.13-.47-4.14,.52-5.06,2.48-.06,.13-.13,.18-.28,.18-1.09,0-2.18,0-3.27,0-.09,0-.22-.07-.28-.14-.29-.39-.56-.8-.83-1.2-.34-.5-.18-.89,.43-1,1.12-.21,2.23-.41,3.35-.61,.18-.03,.27-.09,.3-.29,.2-1.13,.42-2.26,.62-3.39,.11-.57,.49-.73,.98-.4,.96,.66,1.92,1.32,2.88,1.98,.05,.03,.1,.07,.16,.11Z"/><path d="M8.91,3.58c-.41,.39-.77,.73-1.13,1.06-.65,.6-1.64,.36-1.89-.46-.13-.45,.03-.84,.36-1.15,.99-.91,1.98-1.82,2.98-2.71,.49-.44,1.1-.43,1.6,0,.98,.88,1.95,1.76,2.92,2.65,.34,.31,.51,.71,.38,1.17-.12,.46-.45,.73-.91,.81-.36,.06-.67-.08-.93-.31-.32-.28-.63-.57-.94-.86-.06-.06-.12-.11-.23-.21,0,.14,0,.22,0,.3,0,1.09,0,2.18,0,3.27,0,.69-.35,1.08-1,1.16-.6,.08-1.17-.37-1.18-.97-.02-1.15-.01-2.3-.02-3.45,0-.08,0-.16,0-.32Z"/><path d="M10,17.79c-3,0-6,0-9,0-.33,0-.65-.05-.85-.36-.37-.58,0-1.25,.72-1.3,.05,0,.09,0,.14,0,6,0,12,0,17.99,0,.32,0,.64,.05,.84,.35,.18,.27,.21,.55,.07,.85-.16,.33-.45,.42-.78,.46-.06,0-.12,0-.19,0-2.98,0-5.97,0-8.95,0Z"/></svg> ${sunrise}`
      //sunset
    let sunsetinfo=document.createElement('span');
    sunsetinfo.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 17.8"><path d="M10.01,10.05c.99-.68,1.97-1.35,2.95-2.03,.04-.03,.09-.06,.13-.09,.44-.28,.83-.12,.93,.4,.19,1.02,.38,2.03,.56,3.05,.11,.61,.11,.61,.73,.73,.99,.19,1.97,.37,2.96,.55,.44,.08,.67,.3,.62,.63-.02,.12-.07,.24-.14,.34-.28,.42-.57,.84-.87,1.26-.05,.07-.16,.12-.24,.13-1.1,0-2.21,0-3.31,.01-.21,0-.23-.14-.29-.26-.65-1.26-1.64-2.1-3.03-2.4-2.12-.46-4.13,.53-5.05,2.48-.06,.13-.12,.18-.27,.18-1.09,0-2.18,0-3.27,0-.09,0-.22-.06-.28-.14-.29-.39-.54-.81-.84-1.19-.38-.5-.1-.92,.42-1.01,1.12-.19,2.23-.41,3.35-.61,.18-.03,.27-.08,.31-.29,.2-1.13,.41-2.26,.62-3.39,.1-.56,.5-.73,.96-.41,1.01,.69,2.02,1.39,3.05,2.1Z"/><path d="M8.91,4.73c0-.13,0-.22,0-.3,0-1.08,0-2.16,0-3.25,0-.58,.24-.95,.69-1.12,.74-.27,1.48,.2,1.5,.98,.02,1.11,0,2.23,.01,3.34,0,.09,0,.18,0,.33,.1-.08,.16-.13,.22-.18,.33-.3,.64-.6,.98-.89,.66-.57,1.58-.32,1.82,.49,.14,.46-.03,.87-.36,1.18-.97,.9-1.96,1.8-2.95,2.68-.48,.43-1.08,.43-1.56,0-1.02-.9-2.02-1.82-3.02-2.74-.33-.3-.47-.69-.34-1.14,.13-.44,.45-.7,.9-.77,.38-.06,.72,.08,1,.33,.31,.28,.61,.57,.91,.86,.05,.05,.11,.1,.21,.18Z"/><path d="M10,17.8c-3,0-6,0-9,0-.33,0-.65-.05-.85-.36-.37-.58,0-1.25,.72-1.3,.05,0,.09,0,.14,0,6,0,12,0,17.99,0,.32,0,.64,.05,.84,.35,.18,.27,.21,.55,.07,.85-.16,.33-.45,.42-.78,.46-.06,0-.12,0-.19,0-2.98,0-5.97,0-8.95,0Z"/></svg> ${sunset}`;

    // weatherrow.appendChild(weatherimg);
    weatherrow.appendChild(temphighlow);
    weatherrow.appendChild(sunriseinfo);
    weatherrow.appendChild(sunsetinfo);
    rightCol.appendChild(weatherrow);


  //add altogether
  newTrip.appendChild(leftCol);
  newTrip.appendChild(rightCol);
  document.querySelector('.newDestination').insertAdjacentElement('beforebegin',newTrip);
  return;
  };




//upperCase First Letter for input
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}