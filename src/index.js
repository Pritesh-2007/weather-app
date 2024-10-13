window.onload=()=>{
    console.log("hello weather");
    const input = document.getElementById("city");
    const div = document.getElementById("myDropdown");
    let cnt=0;
    const focusfunction=()=>{
      if(localStorage.length<1)
        {
         console.log("Storage is Empty");
         return;
        }
        else{
          
         document.querySelector("#myDropdown").style.display="block";
         let i=0;
         
         while(i<localStorage.length)
         {
         
         let item=document.createElement("p");
         item.innerHTML=localStorage.getItem(localStorage.key(i));
         div.appendChild(item);
         i++;
         }
         document.querySelector("#city").addEventListener("keyup",filterFunction);
         div.addEventListener("click",(e)=>
          {
          let serhfield=e.target.innerHTML;
          input.value=serhfield;
          const parent = document.getElementById('myDropdown');
           while (parent.firstChild) {
           parent.removeChild(parent.firstChild);
           }
         });
       
       }
           
    }
    document.querySelector("#city").addEventListener("focus",focusfunction);
    function filterFunction() {
      const filter = input.value.toUpperCase();
      const div = document.getElementById("myDropdown");
      const p = div.getElementsByTagName("p");
      for (let i = 0; i < p.length; i++) {
        txtValue = p[i].textContent || p[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) 
          {
          p[i].style.display = "";
        } else {
          p[i].style.display = "none";
        }
      }
    } 
    function rendercards(data)
    {   
            let weather_icon_url="https://openweathermap.org/img/wn/";
            const rawlist=data.list;
            const current_weather=rawlist[2];
            let card_img=document.querySelector(".card-img");
            card_img.setAttribute("src",`${weather_icon_url}${current_weather.weather[0].icon}@2x.png`);
            let status=document.querySelector(".card-wstatus");
            status.innerHTML=current_weather.weather[0].description;
            let card_city=document.querySelector(".card-city");
            card_city.innerHTML="City:  "+data.city.name;
            let card_temp=document.querySelector(".card-temp");
            card_temp.innerHTML="Temp:  "+current_weather.main.temp+"°F";
            let card_wind=document.querySelector(".card-wind");
            card_wind.innerHTML="Wind speed:  "+current_weather.wind.speed;
            let card_humidity=document.querySelector(".card-humidity");
            card_humidity.innerHTML="humidity:  "+current_weather.main.humidity;
            let filterlist=[];
                        rawlist.map((x)=>{
               //as there are 4-8 time forcast for a day in this api so peak avg fo all.
                if(x.dt_txt.includes("09:00:00"))
                    {
                       filterlist.push(x);
                    }
            });
            filterlist.forEach(element => {
                const forcastdiv=document.querySelector("#forcastdiv");
                let card=document.createElement("div");
                card.classList.add('flex','flex-col','w-60' ,'card-forcast','mt-5');
                let cardbody=document.createElement("div");
                cardbody.classList.add('flex','text-white','p-3');
                let div=document.createElement("div");
                div.classList.add('flex-grow');
                let cardtitle=document.createElement("div");
                cardtitle.classList.add('font-semibold', 'text-lg');
                cardtitle.innerHTML=element.dt_txt;
                let div2=document.createElement("div");
                div2.classList.add('flex', 'flex-col' ,'text-center');
            
                let img=document.createElement("img");
                img.setAttribute("src",`${weather_icon_url}${element.weather[0].icon}@2x.png`);
                let card_wstatus=document.createElement("p");
                card_wstatus.innerHTML=element.weather[0].description;
                let whichcity=document.createElement("p");
                whichcity.innerHTML="City:  "+data.city.name;
                let temp=document.createElement("p");
                temp.classList.add('mt-4');
                temp.innerHTML="Temp:  "+element.main.temp+"°F";
                let wind=document.createElement("p");
                wind.innerHTML="Wind speed:  "+element.wind.speed;
                let humidity=document.createElement("p");
                humidity.innerHTML="humidity:  "+element.main.humidity;
                div2.appendChild(img);
                div2.appendChild(card_wstatus);
                div.appendChild(cardtitle);
                div.appendChild(whichcity);
                div.appendChild(div2);
                div.appendChild(temp);
                div.appendChild(wind);
                div.appendChild(humidity);
                cardbody.appendChild(div);
                card.appendChild(cardbody);
                forcastdiv.appendChild(card);
               });
    }
    const searchcitybtn=document.querySelector("#searchcitybtn");
    searchcitybtn.addEventListener("click",()=>{
       
        cnt++;
        
        async function fetchdata()
        {
            try{
            let city=document.querySelector("#city").value;
             
            if(city=="" ||city==null)
            {
                alert("Kidly Select or enter City Or can use Current Location feature!");
                return;
            }
            else{
             if(cnt>1)
              {
                const parent = document.getElementById('forcastdiv');
                while (parent.firstChild) 
                   {
                    parent.removeChild(parent.firstChild);
                  }
              }
              const parent = document.getElementById('myDropdown');
              while (parent.firstChild) {
              parent.removeChild(parent.firstChild);
              }
            localStorage.setItem(city,city); 
            //city.innerHTML="";
              input.value="";
            const response= await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=965f44633933b04330b9d71d639f8b08`);
            const data= await response.json();
            let h2=document.querySelector("#five_days");
            h2.style.display="block";
            rendercards(data);
              }
     
            }
           catch(error)
           {
           // console.log(error);
            alert("Kindly enter Valid city name.");
           }
        }
        fetchdata();
    });
    const currentlocationbtn=document.querySelector("#currentlocationbtn");
    currentlocationbtn.addEventListener("click",()=>{
      cnt++;
      if(cnt>1)
        {
          const parent = document.getElementById('forcastdiv');
          while (parent.firstChild) 
             {
              parent.removeChild(parent.firstChild);
            }
        }
        // Check if Geolocation is supported
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
  
  // Function to handle the success scenario
  function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
   async function getcurrentlocationdata()
   {
    const response=await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=965f44633933b04330b9d71d639f8b08`);
    const data =await response.json();
    let h2=document.querySelector("#five_days");
    h2.style.display="block";
    rendercards(data);
   }
   getcurrentlocationdata();
 }
  
  // Function to handle errors
  function showError(error) {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.");
        break;
    }
  }
    });    

};