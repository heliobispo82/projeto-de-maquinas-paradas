function calcular() {
  const pecas = parseFloat(document.getElementById("pecas").value);
  const ciclo = parseFloat(document.getElementById("ciclo").value);
  const cavidades = parseInt(document.getElementById("cavidades").value, 10);
  const tempoOperacao = document.getElementById("tempo-operacao").value;

  // Validações iniciais
  if (isNaN(pecas) || isNaN(ciclo) || isNaN(cavidades) || !tempoOperacao) {
    alert("Preencha todos os campos corretamente.");
    return;
  }

  const regex = /^\d{1,2}\.\d{1,2}\.\d{1,2}$/;
  if (!regex.test(tempoOperacao)) {
    alert("Formato de tempo inválido. Use o formato h.m.s (Exemplo: 04.10.00).");
    return;
  }

  // Converter tempo de operação (h.m.s) para segundos
  const [horas, minutos, segundos] = tempoOperacao.split(".").map(Number);
  const tempoTrabalhadoSegundos = (horas * 3600) + (minutos * 60) + segundos;

  // Calcular produção esperada
  const producaoEsperada = Math.floor((tempoTrabalhadoSegundos / ciclo) * cavidades);

  // Calcular produção perdida e tempo de parada
  const producaoPerdida = Math.max(0, producaoEsperada - pecas); // Evitar valores negativos
  const tempoParadaSegundos = producaoPerdida > 0 ? (producaoPerdida * ciclo) / cavidades : 0;

  // Converter tempo de parada para horas, minutos e segundos
  const horasParada = Math.floor(tempoParadaSegundos / 3600);
  const minutosParada = Math.floor((tempoParadaSegundos % 3600) / 60);
  const segundosParada = Math.floor(tempoParadaSegundos % 60);

  // Exibir resultados formatados
  const resultado = document.getElementById("resultado");
  resultado.innerHTML = `
    <p><strong>Produção Esperada:</strong> ${producaoEsperada.toLocaleString('pt-BR')} peças</p>
    <p><strong>Produção Perdida:</strong> ${producaoPerdida.toLocaleString('pt-BR')} peças</p>
    <p><strong>Tempo de Parada:</strong> ${horasParada} horas, ${minutosParada} minutos e ${segundosParada} segundos</p>
  `;
}