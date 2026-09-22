const services=[
  {name:"Classic Haircut",price:299,duration:"30 min"},
  {name:"Haircut + Beard",price:499,duration:"45 min"},
  {name:"Hair Spa",price:699,duration:"60 min"},
  {name:"Beard Styling",price:199,duration:"20 min"}
];
let selectedService=0,selectedTime="10:00 AM",selectedDate="Today · 22 Sep";

function showPage(page){
  document.querySelectorAll(".page").forEach(p=>p.classList.add("hidden"));
  document.getElementById(page+"-page").classList.remove("hidden");
  window.scrollTo({top:0,behavior:"smooth"});
  if(page==="booking") renderBooking();
}

function renderBooking(){
  const sc=document.getElementById("serviceChoices");
  sc.innerHTML=services.map((s,i)=>`<button class="choice ${i===selectedService?"active":""}" onclick="selectService(${i})"><strong>${s.name}</strong><small>₹${s.price} · ${s.duration}</small></button>`).join("");
  const dates=["Today · 22 Sep","Tomorrow · 23 Sep","Wed · 24 Sep"];
  document.getElementById("dateChoices").innerHTML=dates.map((d,i)=>`<button class="date-choice ${i===0?"active":""}" onclick="selectDate(this,'${d}')">${d.split(" · ")[0]}<small>${d.split(" · ")[1]}</small></button>`).join("");
  const times=["9:00 AM","9:30 AM","10:00 AM","10:30 AM","11:00 AM","11:30 AM","12:00 PM","12:30 PM","1:00 PM","2:00 PM","3:00 PM","4:00 PM"];
  document.getElementById("timeChoices").innerHTML=times.map(t=>`<button class="time-choice ${t==="11:00 AM"?"booked":t===selectedTime?"active":""}" ${t==="11:00 AM"?"disabled":""} onclick="selectTime(this,'${t}')">${t}</button>`).join("");
  updateSummary();
}
function selectService(i){selectedService=i;renderBooking()}
function selectDate(el,d){selectedDate=d;document.querySelectorAll(".date-choice").forEach(x=>x.classList.remove("active"));el.classList.add("active");updateSummary()}
function selectTime(el,t){selectedTime=t;document.querySelectorAll(".time-choice").forEach(x=>x.classList.remove("active"));el.classList.add("active");updateSummary()}
function updateSummary(){const s=services[selectedService];document.getElementById("summaryService").textContent=s.name;document.getElementById("summaryDate").textContent=selectedDate;document.getElementById("summaryTime").textContent=selectedTime;document.getElementById("summaryDuration").textContent=s.duration;document.getElementById("summaryPrice").textContent="₹"+s.price}
function confirmBooking(){
  const name=document.getElementById("customerName").value.trim();
  const phone=document.getElementById("customerPhone").value.trim();
  if(!name||phone.length<10){alert("Please enter your name and a valid mobile number.");return}
  const s=services[selectedService];
  document.getElementById("ticket").innerHTML=`<div><span>Guest</span><strong>${name}</strong></div><div><span>Service</span><strong>${s.name}</strong></div><div><span>When</span><strong>${selectedDate} · ${selectedTime}</strong></div><div><span>Duration</span><strong>${s.duration}</strong></div><div><span>Total</span><strong>₹${s.price}</strong></div>`;
  showPage("success");
}
function toggleStatus(id,button){button.textContent="Checked in";button.style.color="var(--green)";button.parentElement.querySelector(".status").textContent="Checked in";button.parentElement.querySelector(".status").className="status live"}
document.addEventListener("DOMContentLoaded",()=>renderBooking());