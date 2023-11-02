$(document).ready(function () {
    Location();
    Language();
    Sound();
    Dark();
    Draw_Chats();
    Fileupload();
    FileuploadPicture();
    Load_Profile();
    SelectEvent();
    Historyscroll();
    PreparateFilters();

});
function callMe(Id) {
    const parentDiv = document.getElementById("chat_Main");

    // Get the last child element
    const lastChildElement = parentDiv.lastElementChild;

    // Read the id of the last child element
    const lastChildId = lastChildElement.id;
    const targetDiv = document.getElementById(lastChildId);
    targetDiv.scrollIntoView({ behavior: "smooth" });
}
$('#Message').keypress(function (e) {
    var keycode = (e.keyCode ? e.keyCode : e.which);
    if (keycode == '13') {
        var Message = $('#Message').val();
        SendMessage(Message);
    }
});
function Historyscroll() {
    // Get the element you want to monitor for scroll
    const targetElement = document.getElementById('Chat_Area');

    // Function to be called when scroll is at the top of the element
    function handleScroll() {
        if (targetElement.scrollTop === 0) {
            GetHistory();
        }
    }

    // Attach the 'onscroll' event listener to the element
    targetElement.addEventListener('scroll', handleScroll);
}
function GetHistory() {
    var ID = $('#History_ID').text();
    $.ajax({
        type: 'POST',
        url: '/Home/Get_History',
        contenttype: "application/json; charset=utf-8",
        data: {
            ID: ID
        },
        success: function (r) {
            if (r.status == "success") {
                var d1 = document.getElementById('chat_Main');

                // Insert HTML at the start of the element
                d1.insertAdjacentHTML('afterbegin', r.record);

                $('#History_ID').text(r.lastHistory);
            } else if (r.status == "warning") {

            } else {
                console.log(r.message);
            }
        }
    });
}
function SelectEvent() {
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            const activeElement = document.activeElement;

            // Check if the active element is an input element with id 'Message'
            if (activeElement.tagName.toLowerCase() === 'input' && activeElement.id === 'Message') {
                // Prevent the default behavior (form submission)
                event.preventDefault();

                // Get the value from the input field
                var Message = activeElement.value;

                // Perform your desired action here, e.g., call SendMessage
                SendMessage(Message);
            }
        }
    });
}
function Datepicker() {
    $('.datepicker').datepicker({
        format: "dd/mm/yyyy",
        todayBtn: true,
        forceParse: false,
        calendarWeeks: true,
        autoclose: true,
        todayHighlight: true,
        toggleActive: true
    });
}
function Traduction() {
    $.ajax({
        type: 'POST',
        url: '/Home/Load_traductions',
        contenttype: "application/json; charset=utf-8",
        success: function (r) {
            if (r.status == "success") {
                var Clear_Button = document.getElementById("Clear_Button");
                Clear_Button.innerText = r.traductions.clear_Button_Message;

                var Restart_Button = document.getElementById("Restart_Button");
                Restart_Button.innerText = r.traductions.restart_Button_Message;

                var Color_label = document.getElementById("Color_label");
                Color_label.innerText = r.traductions.color_Label_Message;

                var English_label = document.getElementById("English_label");
                English_label.innerText = r.traductions.english_Label_Message;

                var Dark_label = document.getElementById("Dark_label");
                Dark_label.innerText = r.traductions.dark_Theme_Label_Message;

                var Description_label = document.getElementById("Description_label");
                Description_label.innerText = r.traductions.description_Label_Message;

                var Support_label = document.getElementById("Support_label");
                Support_label.innerText = r.traductions.support_Label;

                var Sound_label = document.getElementById("Sound_label");
                Sound_label.innerText = r.traductions.sound_Label;

                var Feedback_label = document.getElementById("Feedback_label");
                Feedback_label.innerText = r.traductions.feedback_Label_Message;

                var Input_label_Picture = document.getElementById("Input_Label_Picture");
                Input_label_Picture.innerText = r.traductions.input_Label_Picture;

                var Filter_Placeholder_Chats = document.getElementById("chatFilter");
                Filter_Placeholder_Chats.placeholder = r.traductions.filter_Placeholder_Chats;

            } else {
                console.log(r.message);
            }
        }
    });
}
function Location() {
    $.ajax({
        type: 'POST',
        url: '/Home/Load_location',
        contenttype: "application/json; charset=utf-8",
        success: function (r) {
            if (r.status == "success") {
                $('#Location').text(r.location);
            } else {
                console.log(r.message);
            }
        }
    });
}
function Language() {
    $.ajax({
        type: 'POST',
        url: '/Home/Load_language',
        contenttype: "application/json; charset=utf-8",
        success: function (r) {
            if (r.status == "success") {
                $.each(r.languages, function (index, item) {
                    $('#SelectLanguage').append($('<option>', {
                        value: item.value,
                        text: item.text
                    }));
                });
                $('#SelectLanguage').val(r.language);
                Traduction();
            } else {
                console.log(r.message);
            }
        }
    });
}
function Dark() {
    $.ajax({
        type: 'POST',
        url: '/Home/Load_dark',
        contenttype: "application/json; charset=utf-8",
        success: function (r) {
            if (r.status == "success") {
                if (r.state == "True") {
                    var Switch = document.getElementById("Dark");
                    Switch.checked = true;
                    const list = document.body.classList;
                    list.add('dark-mode');
                } else {
                    var Switch = document.getElementById("Dark");
                    Switch.checked = false;
                    const list = document.body.classList;
                    list.remove('dark-mode');
                }
            } else {
                console.log(r.message);
            }
        }
    });
}
function Sound() {
    $.ajax({
        type: 'POST',
        url: '/Home/Load_sound',
        contenttype: "application/json; charset=utf-8",
        success: function (r) {
            if (r.status == "success") {
                if (r.state == 1) {
                    var Switch = document.getElementById("Sound");
                    Switch.checked = true;
                } else {
                    var Switch = document.getElementById("Sound");
                    Switch.checked = false;
                }
            } else {
                console.log(r.message);
            }
        }
    });
}
function ChangeLanguage() {
    var Language = $('#SelectLanguage').val();
    $.ajax({
        type: 'POST',
        url: '/Home/Change_language',
        contenttype: "application/json; charset=utf-8",
        data: {
            LANGUAGE: Language
        },
        success: function (r) {
            if (r.status == "success") {
                Traduction();
            } else {
                console.log(r.message);
            }
        }
    });
}
function AutoScroll(Id) {
    const targetDiv = document.getElementById(Id);
    targetDiv.scrollIntoView({ behavior: "smooth", block: 'end' });
}
function openRightSide(ID) {
    $.ajax({
        type: 'POST',
        url: '/Home/Get_Chat',
        contenttype: "application/json; charset=utf-8",
        data: {
            ID: ID
        },
        success: function (r) {
            if (r.status == "success") {
                document.querySelectorAll('.Chats_Contacts').forEach(function (button) {
                    button.classList.remove("active");
                });
                var element = document.getElementById("Chat_" + ID);
                element.classList.add("active");
                $('#Chat_Tittle_Message').text(r.tittle);
                document.title ="Booti "+ r.tittle;
                $('#Tittle_About').text(r.tittle);
                $('#Subtittle_About').text(r.subtittle);
                $('#Description').html(r.description);
                $('#Support_name').html(r.support);
                $('#Chat_ID').text(r.chat);
                $('#History_ID').text(r.lastHistory);
                document.getElementById("Image_About").src = r.avatar;
                document.getElementById("chat_Main").innerHTML = r.record;
                //Aqui se cambia el tipo de input
                document.getElementById("InputType").innerHTML = r.inputHtml;
                LoadScroll();
                $("#base").removeClass("disabledbutton");
                $('#Message').focus();
                $('#chatFilter').val('');
                filterChats();
            } else {
                console.log(r.message);
            }
        }
    });
}
function Draw_Chats() {
    $.ajax({
        type: 'POST',
        url: '/Home/Draw_Chats',
        contenttype: "application/json; charset=utf-8",
        success: function (r) {
            if (r.status == "success") {
                New_Theme(r.theme);
                openRightSide(r.id);
                var d1 = document.getElementById('Chats');
                d1.insertAdjacentHTML('beforeend', r.chats);

            } else {
                console.log(r.message);
            }
        }
    });
}
function Load_Profile() {
    $.ajax({
        type: 'POST',
        url: '/Home/Load_Profile',
        contenttype: "application/json; charset=utf-8",
        success: function (r) {
            if (r.status == "success") {
                $('#User_Name').text(r.name);
                var imageElement = document.getElementById("Image_User");
                imageElement.src = r.profile;
            } else {
                console.log(r.message);
            }
        }
    });

}
function Dwnload(route, filename) {
    var ID_Sec = $('#Chat_ID').text();
    window.location = '/Home/Dwnload?ROUTE=' + route + "&CHAT=" + ID_Sec + "&filename=" + filename;
}
function clearBox() {
    var ID = $('#Chat_ID').text();
    $.ajax({
        type: 'POST',
        url: '/Home/Clear_Records',
        contenttype: "application/json; charset=utf-8",
        data: {
            ID: ID
        },
        success: function (r) {
            if (r.status == "success") {
                document.getElementById("chat_Main").innerHTML = '';
                $('#Message').focus();
            } else {
                console.log(r.message);
            }
        }
    });
}
function restartBox() {
    $.ajax({
        type: 'POST',
        url: '/Home/Restart_Chat',
        contenttype: "application/json; charset=utf-8",
        success: function (r) {
            if (r.status == "success") {
                SendMessage(r.welcome);
            } else {
                console.log(r.message);
            }
        }
    });

}
function SendSelect(selectElement) {
    SendMessage(selectElement.value);
}
function SendInput() {
    var Message = null;
    var Tipo = document.getElementById('Message').tagName;
    if (Tipo == "TABLE") {
        //aqui se modifica la tabla y se envia como mensaje
        // Iterate through each row in the table body
        const tableBody = document.querySelector('#Message tbody');
        const rows = tableBody.querySelectorAll('tr');

        rows.forEach(row => {
            const input = row.querySelector('input[name="name"]');
            const select = row.querySelector('select[name="name"]');
            if (input) {
                const inputValue = input.value;
                input.outerHTML = inputValue; // Replace the input element with its value
            }

            if (select) {
                const selectValue = select.options[select.selectedIndex].value;
                select.outerHTML = selectValue; // Replace the select element with its selected value
            }

        });

        // Get the updated HTML content of the table
        const updatedTableHTML = document.querySelector('#Message').outerHTML;
        Message = updatedTableHTML.replace(" id=\"Message\"", "");//Tabla
    } else {
        Message = $('#Message').val();
    }
    SendMessage(Message);
}
function SendMessage(Message) {
    var ID = $('#Chat_ID').text();
    $.ajax({
        type: 'POST',
        url: '/Home/Message',
        contenttype: "application/json; charset=utf-8",
        data: {
            MESSAGE: Message,
            CHAT: ID,
        },
        beforeSend: function () {
            $("#base").addClass("disabledbutton");
            var inputMessage = document.getElementById("Message");
            if (inputMessage !== null) {
                if (inputMessage.tagName === "INPUT") {
                    inputMessage.disabled = true;
                }
            }
        },
        success: function (r) {
            if (r.status == "success") {
                if (r.next_Response == 1) {
                    var Chat_Before = document.getElementById('chat_Main');
                    var Position = Chat_Before.clientHeight;
                    Chat_Before.insertAdjacentHTML('beforeend', r.record);

                    Chat_Before = document.getElementById('chat_Main');
                    const Scroll = document.getElementById(r.scrollId);
                    Scroll.scrollIntoView({ behavior: "smooth"});
                }
                $.ajax({
                    type: 'POST',
                    url: '/Home/Answer',
                    contenttype: "application/json; charset=utf-8",
                    data: {
                        MESSAGE: Message,
                        CHAT: ID,
                    },
                    beforeSend: function () {
                        $('#Status').text(r.loading);
                        $("#chat_zone").addClass("processing_label_on");
                    },
                    complete: function () {
                        $("#chat_zone").removeClass("processing_label_on");
                        $("#base").removeClass("disabledbutton");
                    },
                    success: function (r) {
                        //Validar que el chat este activo
                        var ID_Sec = $('#Chat_ID').text();

                        if (ID_Sec == ID) {
                            Chat_Before = document.getElementById('chat_Main');
                            Chat_Before.insertAdjacentHTML('beforeend', r.answer);
                        }
                        //Aqui se cambia el tipo de input
                        document.getElementById("InputType").innerHTML = r.question;
                        /*   $('#Message').focus();*/

                        var inputMessage = document.getElementById("Message");
                        if (inputMessage !== null) {
                            if (inputMessage.tagName === "INPUT") {
                                inputMessage.focus();
                                inputMessage.setSelectionRange(inputMessage.value.length, inputMessage.value.length);
                            }
                        }
                        Chat_Before = document.getElementById('chat_Main');
                        const Scroll = document.getElementById(r.scrollId);
                        Scroll.scrollIntoView({ behavior: "smooth" });

                        $('#Status').text(r.status);

                        //validate if there is audio to autoplay
                        if (r.sound >= 1) {
                            var audio = document.getElementById("WorkyMessageSound_" + r.sound);
                            if (audio.paused) {
                                audio.play();
                            } else {
                                audio.currentTime = 0; // Rewind to the beginning and play again
                            }
                            audio.play();
                        }
                    },
                    error: function (r) {
                        console.log(r.message);
                    }
                });
            } else {
                console.log(r.message);
            }
        }
    });
}
function Menu_Left() {
    var x = document.getElementById("Chats");
    if (x.style.display === "flex" || x.style.display === "") {
        x.style.display = "none";
    } else {
        x.style.display = "flex";
    }
}
function Menu_Bot() {
    var x = document.getElementById("Menu_Bot");
    var y = document.getElementById("Menu_User");
    if (x.style.display === "flex" || x.style.display === "") {
        x.style.display = "none";
    } else {
        x.style.display = "flex";
        y.style.display = "none";
    }
}
function Menu_User() {
    var y = document.getElementById("Menu_Bot");
    var x = document.getElementById("Menu_User");
    if (x.style.display === "flex" || x.style.display === "") {
        x.style.display = "none";
    } else {
        x.style.display = "flex";
        y.style.display = "none";
    }
}
function Change_Theme(Theme) {
    $.ajax({
        type: 'POST',
        url: '/Home/Change_Theme',
        contenttype: "application/json; charset=utf-8",
        data: {
            THEME: Theme
        },
        success: function (r) {
            if (r.status == "success") {
                New_Theme(r.theme);
            } else {
                console.log(r.message);
            }
        }
    });
}
function Change_Dark() {
    var Switch = document.getElementById("Dark");
    var Status = Switch.checked;
    if (Status == false) {
        const list = document.body.classList;
        list.remove('dark-mode');
        Status = false;
    } else {
        const list = document.body.classList;
        list.add('dark-mode');
        Status = true;
    }
    $.ajax({
        type: 'POST',
        url: '/Home/Change_Dark',
        contenttype: "application/json; charset=utf-8",
        data: {
            STATUS: Status
        },
        success: function (r) {
            if (r.status == "success") {

            } else {
                console.log(r.message);
            }
        }
    });
}
function Change_Sound() {
    var Switch = document.getElementById("Sound");
    var Status = Switch.checked;

    $.ajax({
        type: 'POST',
        url: '/Home/Change_Sound',
        contenttype: "application/json; charset=utf-8",
        data: {
            STATUS: Status
        },
        success: function (r) {
            if (r.status == "success") {

            } else {
                console.log(r.message);
            }
        }
    });
}
function New_Theme(Theme) {
    const colors = document.querySelectorAll('.color');
    colors.forEach(c => c.classList.remove('selected'));
    document.body.setAttribute('data-theme', Theme);
    var Color_Seleccionado = document.getElementById("Color_" + Theme);
    Color_Seleccionado.classList.add("selected");
}
function Fileupload() {
    $(document).on('change', '.file-upload', function () {
        var files = this.files;
        var formData = new FormData();
        for (var i = 0; i < files.length; i++) {
            formData.append('myFiles[]', files[i]);
        }
        var ID_Sec = $('#Chat_ID').text();
        $.ajax({
            url: '/Home/Upload?ID=' + ID_Sec,
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            beforeSend: function () {
                $('#Status').text('Uploading files...');
            },
            complete: function () {
                $('#Status').text('Online');
            },
            success: function (data) {
                SendMessage(data.message);
            },
            error: function (jqXHR, textStatus, errorMessage) {
                console.log(errorMessage); // Log any error messages to the console
            }
        });
    });
    $(document).on('click', '.send-files-button', function () {
        var fileInputID = $(this).data('file-input');
        $(fileInputID).trigger('click');
    });
}
function FileuploadPicture() {
    $(document).on('change', '.file-upload-picture', function () {
        var files = this.files;
        var formData = new FormData();
        for (var i = 0; i < files.length; i++) {
            formData.append('myFiles[]', files[i]);
        }
        $.ajax({
            url: '/Home/UploadPicture',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (data) {
                var ID = $('#Chat_ID').text();
                Load_Profile();
                openRightSide(ID);
            },
            error: function (jqXHR, textStatus, errorMessage) {
                console.log(errorMessage); // Log any error messages to the console
            }
        });
    });
    $(document).on('click', '.send-files-button-picture', function () {
        var fileInputID = $(this).data('file-input');
        $(fileInputID).trigger('click');
    });
}
function filterList(id) {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById(id);
    filter = input.value.toUpperCase();
    ul = document.getElementById('itemList');
    li = ul.getElementsByTagName('li');

    for (i = 0; i < li.length; i++) {
        txtValue = li[i].textContent || li[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = '';
        } else {
            li[i].style.display = 'none';
        }
    }
}
function LoadScroll() {
    var elem = document.getElementById('Chat_Area');
    elem.scrollTop = elem.scrollHeight;
}
function PreparateFilters() {
    document.getElementById('chatFilter').onkeyup = function () {
        filterChats();
    };

}
function filterChats() {
    const chatFilterInput = document.getElementById('chatFilter');
    const chatContainer = document.getElementById('Chats');
    const filterText = chatFilterInput.value.toLowerCase();

    // Get all chat sections with class "msg"
    const chatSections = chatContainer.querySelectorAll('.msg');

    chatSections.forEach(chatSection => {
        const chatUsername = chatSection.querySelector('.msg-username').textContent.toLowerCase();
        const chatMessage = chatSection.querySelector('.msg-message').textContent.toLowerCase();

        // Check if the username or message contains the filter text
        if (chatUsername.includes(filterText) || chatMessage.includes(filterText)) {
            chatSection.style.display = 'flex'; // Show the chat section
        } else {
            chatSection.style.display = 'none'; // Hide the chat section
        }
    });
}
function zoomImage(imageSrc) {
    var zoomedImage = document.getElementById('zoomed-image');
    var zoomedImageContent = document.getElementById('zoomed-image-content');

    // Display the zoomed-in image and set its source
    zoomedImage.style.display = 'block';
    zoomedImageContent.src = imageSrc;
}
function closeZoomedImage() {
    var zoomedImage = document.getElementById('zoomed-image');

    // Hide the zoomed-in image when clicked
    zoomedImage.style.display = 'none';
}