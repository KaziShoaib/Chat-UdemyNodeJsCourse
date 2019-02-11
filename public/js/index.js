window.addEventListener( "pageshow", function ( event ) {
  var historyTraversal = event.persisted ||
                        ( typeof window.performance != "undefined" &&
                        window.performance.navigation.type === 2 );
  if ( historyTraversal ) {
    window.location.reload();
  }
});

function process(event){
  let nameField = document.getElementById('user-name');
  let roomField = document.getElementById('room-name');
  let roomSelect = document.getElementById('selectRoom');
  nameField.value = nameField.value.trim();
  roomField.value = roomField.value.trim().toLowerCase();
  if(roomField.value!==''&&roomSelect.value!==''){
    event.preventDefault();
    alert('two room names provided');
    selectRoom.value = '';
    roomField.value = '';
    return false;
  }
  if(roomField.value===''&&roomSelect.value!=='')
    roomField.value = roomSelect.value;
}

function createOptionElement(text, value){
  let el = document.createElement("option");
  el.textContent = text;
  el.value = value;
  return el;
}

function populateSelect(){
  let select = document.getElementById('selectRoom');
  $.get('/rooms',function(data, status){
    if(data.length===0)
    {
      return select.disabled = "disabled";
    }
    select.remove(0);
    select.appendChild(createOptionElement('select a room', ''));
    for(let i=0;i<data.length;i++){
      let optEl = createOptionElement(data[i],data[i]);
      select.appendChild(optEl);
    }
  });
}
