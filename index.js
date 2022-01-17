"use strict"

var rp = require('request-promise');

exports.getTicket= function (usr,pw) {
  return new Promise((resolve, reject) => {
    var options= {};
    options.url='https://api.dataforsyningen.dk/service';
    options.qs= {};
    options.qs.service= 'META';
    options.qs.request= 'GetToken';
    options.qs.login= usr;
    options.qs.password= pw;
    //options.resolveWithFullResponse= true;
    var jsonrequest= rp(options).then((body) => {    
      console.log('gettoken: %s, %d', body, body.length);
      if (body.length === 32) { // returnerer en status 200 ved ukendt username/password?!
        resolve(body);
      }
      else {
        reject('Ukendt username/password');
      }
    })
    .catch((err) => {
      reject('fejl i request af dataforsyningen: ' + err);
    });
  });
}
