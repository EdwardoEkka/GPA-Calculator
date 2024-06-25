const MainContainer = document.querySelector(".main-container");
const For10 = document.createElement("button");
For10.innerText = "Calculate your GPA Score";
For10.className = "for-10";
MainContainer.appendChild(For10);
For10.addEventListener("click", () => {
  Base10();
});

let subNo = 0;

function Base10() {
  MainContainer.innerHTML = "";
  const Container1 = document.createElement("div");
  MainContainer.appendChild(Container1);
  Container1.className = "container1";
  const inputSubjects = document.createElement("input");
  inputSubjects.id = "subject-input";
  const labelSubjects = document.createElement("label");
  labelSubjects.htmlFor = "subject-input";
  labelSubjects.innerText = "Enter the number of subjects";
  Container1.appendChild(labelSubjects);
  Container1.appendChild(inputSubjects);
  const submitNoSubjects = document.createElement("button");
  submitNoSubjects.className = "submit-no-sub";
  submitNoSubjects.innerText = "Submit No of Subjects";
  Container1.appendChild(submitNoSubjects);
  submitNoSubjects.addEventListener("click", () => {
    subNo = inputSubjects.value;
    MakeSubjectForm(subNo);
  });
}

let DataForm = [];
let GID = false;
let Grades = [
  { g: "O", v: 10 },
  { g: "A+", v: 9 },
  { g: "A", v: 8 },
  { g: "B+", v: 7 },
  { g: "B", v: 6 },
  { g: "C", v: 5 },
  { g: "F", v: 0 },
  { g: "AB", v: 0 },
];

function MakeSubjectForm(subNo) {
  if (!subNo) {
    console.log("Enter a valid number of subjects.");
    return;
  }
  
  const existingContainer2 = document.querySelector(".container2");
  if (existingContainer2) existingContainer2.remove();
  const existingSubmitButton = document.querySelector(".cal-btn");
  if (existingSubmitButton) existingSubmitButton.remove();
  const existingDisplayContainer = document.querySelector(".display-container");
  if (existingDisplayContainer) existingDisplayContainer.remove();
  const existingScore=document.querySelector('.score');
  if(existingScore) existingScore.remove();

  SubjectForm = [];
  const Container2 = document.createElement("div");
  Container2.className = "container2";
  const TopBody = document.createElement("div");
  TopBody.className = "all-input-head";
  const SubjectLabel = document.createElement("input");
  SubjectLabel.className = "sub-head";
  SubjectLabel.value = "Subject";
  SubjectLabel.readOnly = true;
  const CreditLabel = document.createElement("input");
  CreditLabel.className = "cred-head";
  CreditLabel.value = "Credit";
  CreditLabel.readOnly = true;
  const GradeLabel = document.createElement("input");
  GradeLabel.className = "grad-head";
  GradeLabel.value = "Grade";
  GradeLabel.readOnly = true;
  GradeLabel.addEventListener("click", () => {
    const input = document.getElementsByClassName("grades");
    const select = document.getElementsByClassName("grade-val");
    if (GID) {
      for (let k = 0; k < input.length; k++) {
        select[k].style.display = "block";
        input[k].style.display = "none";
      }
      GID = false;
    } else {
      for (let k = 0; k < input.length; k++) {
        select[k].style.display = "none";
        input[k].style.display = "block";
      }
      GID = true;
    }
  });
  TopBody.appendChild(SubjectLabel);
  TopBody.appendChild(CreditLabel);
  TopBody.appendChild(GradeLabel);
  Container2.appendChild(TopBody);
  for (let i = 0; i < subNo; i++) {
    const allInputContainer = document.createElement("div");
    allInputContainer.classList = "all-input";
    const inputSubject = document.createElement("input");
    inputSubject.classList = "subject";
    inputSubject.type = "text";
    const inputCredits = document.createElement("input");
    inputCredits.classList = "credits";
    inputCredits.type = "number";
    inputCredits.style.width = "40px";
    const inputGrades = document.createElement("input");
    inputGrades.classList = "grades";
    inputGrades.type = "number";
    inputGrades.style.width = "40px";
    inputGrades.style.display = "none";
    const gradeSelect = document.createElement("select");
    gradeSelect.classList = "grade-val";
    Grades.forEach((grade) => {
      const option = document.createElement("option");
      option.innerText = grade.g;
      option.value = grade.v;
      gradeSelect.appendChild(option);
    });
    allInputContainer.appendChild(inputSubject);
    allInputContainer.appendChild(inputCredits);
    allInputContainer.appendChild(inputGrades);
    allInputContainer.appendChild(gradeSelect);
    Container2.appendChild(allInputContainer);
  }
  MainContainer.appendChild(Container2);
  const ButtonCalculate = document.createElement("button");
  ButtonCalculate.innerText = "Submit";
  ButtonCalculate.className = "cal-btn";
  ButtonCalculate.addEventListener("click", () => {
    getTheData();
    displayAllSubjects();
  });
  MainContainer.appendChild(ButtonCalculate);
}

function getGradeA(value) {
  if (value == 10) {
    return "O";
  } else if (value == 9) {
    return "A+";
  } else if (value == 8) {
    return "A";
  } else if (value == 7) {
    return "B+";
  } else if (value == 6) {
    return "B";
  } else if (value == 5) {
    return "C";
  } else {
    return "F";
  }
}

function getTheData() {
  const getSubjects = document.getElementsByClassName("subject");
  const getCredits = document.getElementsByClassName("credits");
  const getGrades = document.getElementsByClassName("grades");
  const gradVal = document.getElementsByClassName("grade-val");
  let sumCredit = 0;
  let total = 0;
  DataForm = [];
  for (let i = 0; i < subNo; i++) {
    let value = GID ? getGrades[i].value : gradVal[i].value;
    DataForm.push({
      subject: getSubjects[i].value,
      credit: getCredits[i].value,
      grade_val: value,
      grade: getGradeA(value),
    });
  }
    console.log(DataForm);
}

function displayAllSubjects() {
  const existingDisplayContainer = document.querySelector(".display-container");
  if (existingDisplayContainer) existingDisplayContainer.remove();
  const existingScore=document.querySelector('.score');
  if(existingScore) existingScore.remove();

  const DisplayContainer = document.createElement("div");
  DisplayContainer.className = "display-container";

  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");

  const headerRow = document.createElement("tr");
  const thSubject = document.createElement("th");
  thSubject.innerText = "Subject";
  const thCredit = document.createElement("th");
  thCredit.innerText = "Credit";
  const theScore=document.createElement("th");
  theScore.innerText="Score";
  const thGrade = document.createElement("th");
  thGrade.innerText = "Grade";
  headerRow.appendChild(thSubject);
  headerRow.appendChild(thCredit);
  headerRow.appendChild(theScore);
  headerRow.appendChild(thGrade);
  thead.appendChild(headerRow);
  table.appendChild(thead);

  DataForm.forEach((data) => {
    const row = document.createElement("tr");
    const tdSubject = document.createElement("td");
    tdSubject.innerText = data.subject;
    tdSubject.style.maxWidth='100px';
    tdSubject.style.wordBreak='keep-all';
    const tdCredit = document.createElement("td");
    tdCredit.innerText = data.credit;
    const tdScore=document.createElement("td");
    tdScore.innerText=data.grade_val;
    const tdGrade = document.createElement("td");
    tdGrade.innerText = data.grade;

    row.appendChild(tdSubject);
    row.appendChild(tdCredit)
    row.appendChild(tdScore);
    row.appendChild(tdGrade);
    tbody.appendChild(row);
  });

  table.appendChild(tbody);
  DisplayContainer.appendChild(table);
  const GPA = document.createElement("div");
  GPA.className='score';
  let total=0;
  let totalCredits=0;
  DataForm.forEach(data => {
    total=total+Number(data.credit)*(data.grade_val>=5?Number(data.grade_val):0);
    totalCredits=totalCredits+Number(data.credit);
  });
  GPA.innerText=`Your Score is: ${total/totalCredits}`;
  MainContainer.appendChild(DisplayContainer);
  MainContainer.appendChild(GPA);
}

