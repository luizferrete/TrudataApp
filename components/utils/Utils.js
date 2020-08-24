export const formatarData = data => {
  if (data == null) {
    return '';
  }

  const date = new Date(data);

  const day = date
    .getDate()
    .toString()
    .padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  const formatted = `${day}/${month}/${year}`;

  return formatted;
};

export const formatarCurrency = valor => {
  if (valor) {
    //var numero = valor.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    //return `R$ ${numero}`;
    var numero = valor.toFixed(2).split('.');
    numero[0] = 'R$ ' + numero[0].split(/(?=(?:...)*$)/).join('.');
    return numero.join(',');
  }
  return 'R$ 0,00';
};

export const stringDataSemAno = dataParametro => {
  var data = new Date(dataParametro);
  var mes = ('0' + (data.getMonth() + 1)).slice(-2);
  var dia = ('0' + data.getDate()).slice(-2);
  return `${dia}/${mes}`;
};

export const stringDataSemDia = dataParametro => {
  var data = new Date(dataParametro);
  var mes = ('0' + (data.getMonth() + 1)).slice(-2);
  var ano = data.getFullYear();
  return `${mes}/${ano}`;
};
