const VALUE_BILLION_BRL = 25;  // 1 bi = R$25
const VALUE_BILLION_KK = 1100; // 1 bi = 1100 kk

const VALUE_PER_KK = VALUE_BILLION_BRL / VALUE_BILLION_KK;
const KK_PER_BRL = VALUE_BILLION_KK / VALUE_BILLION_BRL;

function brlToKK(amountBRL: number): number {
  return amountBRL * KK_PER_BRL;
}

function kkToBRL(amountKK: number): number {
  return amountKK * VALUE_PER_KK;
}

// Nova função para interpretar valores com 'bi', 'kkk', 'kk'
function parseCustomKKInput(input: string): number {
  const normalized = input.trim().toLowerCase();

  const biMatch = normalized.match(/^(\d+(?:[\.,]?\d*)?)\s*bi$/);
  const kkkMatch = normalized.match(/^(\d+(?:[\.,]?\d*)?)\s*kkk$/);
  const kkMatch = normalized.match(/^(\d+(?:[\.,]?\d*)?)\s*kk$/);
  const plainNumber = normalized.match(/^(\d+(?:[\.,]?\d*)?)$/);

  const parse = (val: string) => parseFloat(val.replace(',', '.'));

  if (biMatch) return parse(biMatch[1]) * VALUE_BILLION_KK;
  if (kkkMatch) return parse(kkkMatch[1]) * 1000;
  if (kkMatch) return parse(kkMatch[1]);
  if (plainNumber) return parse(plainNumber[1]);

  return NaN;
}

function convert(): void {
  const amountInput = document.getElementById("amount") as HTMLInputElement;
  const conversionType = (document.getElementById("conversionType") as HTMLSelectElement).value;
  const resultDiv = document.getElementById("result") as HTMLDivElement;

  const rawInput = amountInput.value;
  const amount =
    conversionType === "kk-to-brl"
      ? parseCustomKKInput(rawInput)
      : parseFloat(rawInput.replace(',', '.'));

  if (isNaN(amount) || amount <= 0) {
    resultDiv.style.color = "crimson";
    resultDiv.innerText = "Please enter a valid amount.";
    resultDiv.style.opacity = "1";
    return;
  }

  resultDiv.style.color = "#222";

  if (conversionType === "brl-to-kk") {
    const kk = brlToKK(amount);

    const billions = Math.floor(kk / VALUE_BILLION_KK);
    const remainderKK = kk % VALUE_BILLION_KK;

    let roundedRemainderKK: number;
    if (remainderKK % 1 >= 0.6) {
      roundedRemainderKK = Math.ceil(remainderKK);
    } else {
      roundedRemainderKK = Math.floor(remainderKK);
    }

    let answer = `BRL ${amount.toFixed(2).replace('.', ',')} é aproximadamente `;

    if (billions > 0) {
      answer += `${billions} bi`;
      if (roundedRemainderKK > 0) {
        if (roundedRemainderKK >= 1000) {
          answer += ` e ${roundedRemainderKK} kkk`;
        } else {
          answer += ` e ${roundedRemainderKK} kk`;
        }
      }
    } else {
      if (roundedRemainderKK >= 1000) {
        answer += `${roundedRemainderKK} kkk`;
      } else {
        answer += `${roundedRemainderKK} kk`;
      }
    }

    resultDiv.innerText = answer;

  } else {
    const brl = kkToBRL(amount);
    resultDiv.innerText = `${rawInput} é aproximadamente BRL ${brl.toFixed(2).replace('.', ',')}`;
  }

  resultDiv.style.opacity = "1";
}

document.addEventListener("DOMContentLoaded", () => {
  const convertBtn = document.getElementById("convertBtn") as HTMLButtonElement;
  convertBtn.addEventListener("click", convert);

  const amountInput = document.getElementById("amount") as HTMLInputElement;
  amountInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      convert();
    }
  });
});
