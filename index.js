"use strict";
const VALUE_BILLION_BRL = 25; // 1 billion = 25 BRL
const VALUE_BILLION_KK = 1100; // 1 billion = 1100 kk
const VALUE_PER_KK = VALUE_BILLION_BRL / VALUE_BILLION_KK; // ~0.022727
const KK_PER_BRL = VALUE_BILLION_KK / VALUE_BILLION_BRL; // ~44 kk per BRL
function brlToKK(amountBRL) {
    return amountBRL * KK_PER_BRL;
}
function kkToBRL(amountKK) {
    return amountKK * VALUE_PER_KK;
}
function convert() {
    const amountInput = document.getElementById("amount");
    const conversionType = document.getElementById("conversionType").value;
    const resultDiv = document.getElementById("result");
    const amount = parseFloat(amountInput.value);
    if (isNaN(amount) || amount <= 0) {
        resultDiv.style.color = "crimson";
        resultDiv.innerText = "Please enter a valid amount.";
        resultDiv.style.opacity = "1";
        return;
    }
    resultDiv.style.color = "#222"; // reset color
    if (conversionType === "brl-to-kk") {
        const kk = brlToKK(amount);
        const billions = Math.floor(kk / VALUE_BILLION_KK);
        const remainderKK = kk % VALUE_BILLION_KK;
        let roundedRemainderKK;
        if (remainderKK % 1 >= 0.6) {
            roundedRemainderKK = Math.ceil(remainderKK);
        }
        else {
            roundedRemainderKK = Math.floor(remainderKK);
        }
        let answer = `BRL ${amount.toFixed(2).replace('.', ',')} é aproximadamente `;
        if (billions > 0) {
            answer += `${billions} bi`;
            if (roundedRemainderKK > 0) {
                if (roundedRemainderKK >= 1000) {
                    answer += ` and ${roundedRemainderKK} kkk`;
                }
                else {
                    answer += ` and ${roundedRemainderKK} kk`;
                }
            }
        }
        else {
            if (roundedRemainderKK >= 1000) {
                answer += `${roundedRemainderKK} kkk`;
            }
            else {
                answer += `${roundedRemainderKK} kk`;
            }
        }
        resultDiv.innerText = answer;
    }
    else {
        const brl = kkToBRL(amount);
        resultDiv.innerText = `${amount.toFixed(0)} kk é aproximadamente BRL ${brl.toFixed(2).replace('.', ',')}`;
    }
    resultDiv.style.opacity = "1";
}
document.addEventListener("DOMContentLoaded", () => {
    const convertBtn = document.getElementById("convertBtn");
    convertBtn.addEventListener("click", convert);
    const amountInput = document.getElementById("amount");
    amountInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            convert();
        }
    });
});
