const board = document.getElementById("layout");
const headUsdRate = document.getElementById("usRate");
const boardTitle = document.getElementById("brd-title");

function formatDate(){
     const dater = new Date();
     let myDate = dater.getDate();
     const month = dater.toLocaleDateString('default', { month: 'long' });
     const year = dater.getFullYear();

     switch (myDate) {
          case 1:
               myDate = `${myDate}st`;
               break;
          case 2:
               myDate = `${myDate}nd`;
               break;
          case 3:
               myDate = `${myDate}rd`;
               break;
          case 21:
               myDate = `${myDate}st`;
               break;
          case 22:
               myDate = `${myDate}nd`;
               break;
          case 23:
               myDate = `${myDate}rd`;
               break;
          case 31:
               myDate = `${myDate}st`;
               break;
          default:
               myDate = `${myDate}th`;
               break;
     }

     return `${myDate} of ${month} ${year}`
}

function main(){
     const api = "https://currency-converter-eight-eta.vercel.app/"
     fetch(api)
          .then(response => response.json())
          .then(data => {
               data.forEach(curr => {
                    if(curr.currencyCode == "usd"){
                         headUsdRate.innerText = Math.trunc(parseFloat(curr.rate.replace(",", "")));
                    }
                    const boardItem = document.createElement("div");
                    boardItem.className = "brd-item";
                    const cleanRate = curr.rate.replace(",", "");
                    boardItem.innerHTML = `
                    <table>
                         <tr class="conversion">
                              <td>1</td>
                              <td>⥂</td>
                              <td>${Math.trunc(parseFloat(cleanRate))}</td>
                         </tr>
                         <tr class="curr-name">
                              <td>${curr.name}</td>
                              <td> </td>
                              <td>Nigerian Naira</td>
                         </tr>
                    </table>
                    `;
                    board.appendChild(boardItem);
               });
          })
          .then(() => {
               boardTitle.innerText = `Exchange Rate of Nigerian Naira as of ${formatDate()}`
          });
}

main();