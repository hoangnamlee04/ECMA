
// Bài 1
var users = [
  { id: 1, name: "Jams Smith", gender: 1 },
  { id: 2, name: "Isla Brown", gender: 2 },
  { id: 3, name: "Amelia Davies", gender: 2 },
  { id: 4, name: "Jacob Evans", gender: 1 },
];
var target = document.querySelector("#target");

let html = users.map((item, index) => {
  let gender = item.gender == 1 ? "male" : "female";
  return `<li><a href="">${item.id}-${item.name}-${gender}</a></li>`;
});
target.innerHTML = html.join("");

// Bài 2 
function bai2() {
  let id = document.querySelector("input[name='id']").value;
  let name = document.querySelector("input[name='name']").value;
  let gender = document.querySelector("select[name='gender']").value;
  target.innerHTML += `<li><a href="">${id}-${name}-${gender}</a></li>`;
}
let btnAdd = document.querySelector(".add");
btnAdd.addEventListener("click", bai2);

// Bài 3 
function bai3() {
  let string = document.querySelector('input[name="inputStr"').value;
  string = string.replace(/[^\w\s]/g, "");
  string = string.split(" ");
  let [str, ...strs] = string;
  let output = [str];
  strs.forEach((value) => {
    if (value != "") {
      let tmp = value.replace(value[0], value[0].toUpperCase());
      output.push(tmp);
    }
  });
  console.log(output.join(""));
}
let btnConvert = document.querySelector("#btnConvert");
btnConvert.addEventListener("click", bai3);

// Bài 4
let classRoom = [
  "nguyễn văn nam",
  "hoàng xuân trường",
  "Hồ quang hiếu",
  " Nguyễn đức hưởng",
  "đoàn khánh linh",
  "Hồ văn dũng",
  " Lê Thành nam",
  "ngô thanh tú",
];

// Câu 1:
classRoom.forEach((value, index) => {
  if (index != classRoom.length - 1) {
    let fullName = value.trim().split(" ");
    let [firstName, lastName] = fullName;
    console.log(firstName, lastName);
  } else {
    let fullName = value.split(" ");
    fullName = fullName.slice(-2);
    let [firstName, lastName] = fullName;
    console.log(firstName, lastName);
  }
});
// Câu 2: T
classRoom.splice(2, 0, "Nguyễn Văn Nam");
// Câu 3: 
classRoom.splice(3, 1);
// Câu 4:
function bai4(str) {
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  return str;
}
function searchName(keyword) {
  return classRoom.filter((str) => {
    return bai4(str).includes(bai4(keyword));
  });
}
console.log(searchName("nguyen"));
