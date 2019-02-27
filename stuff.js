let fields = [
  'Felt-navn',
  'Værdi',
  'BillyKontoNr',
  'BillyKontoNavn',
  'DetteAarDebet',
  'DetteAarKredit',
  'SidsteAarDebet',
  'SidsteAarKredit'];

let input = {
  Væradi: 'hello'
}
  let jsonArray = [];
  for (const key in input) {
    jsonArray.push(key);
  }

  // if keys in json dont match fields
  if (!jsonArray.every(elem => fields.indexOf(elem) > -1)) {
    
    throw new HttpError('Bad input', 'Json keys dont match', 400);
  }