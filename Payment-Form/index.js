 var users = [];
        var editingIndex = -1; 
                function loadUsers() {
            var savedUsers = localStorage.getItem('paymentUsers');
            if (savedUsers) {
                users = JSON.parse(savedUsers);
            }
            displayUsers();
        }
        function saveToLocalStorage() {
            localStorage.setItem('paymentUsers', JSON.stringify(users));
        }
        function addUser() {
            var title = document.querySelector('input[name="title"]:checked').value;
            var name = document.getElementById('name').value;
            var email = document.getElementById('email').value;
            var cardType = document.getElementById('cardType').value;
            var saveData = document.getElementById('saveData').checked;
            
            if (name === '' || email === '') {
                alert('Please fill in all required fields (Name and Email)');
                return;
            }
            var user = {
                title: title,
                name: name,
                email: email,
                cardType: cardType,
                saveData: saveData
            };
            
            if (editingIndex >= 0) {
                users[editingIndex] = user;
                editingIndex = -1;
            } else {
                users.push(user);
            }
            
            saveToLocalStorage();
            displayUsers();
            clearForm();
        }
        
        function displayUsers() {
            var tableBody = document.getElementById('usersTableBody');
            var userCount = document.getElementById('userCount');
            
            tableBody.innerHTML = '';
            
            if (users.length === 0) {
                userCount.textContent = 'NO of User 0';
                return;
            }
            
            for (var i = 0; i < users.length; i++) {
                var user = users[i];
                var row = tableBody.insertRow();
                
                var nameCell = row.insertCell(0);
                nameCell.textContent = user.title + ' - ' + user.name;
                
                var emailCell = row.insertCell(1);
                emailCell.textContent = user.email;
                
                var cardCell = row.insertCell(2);
                cardCell.textContent = user.cardType;
                
                var saveDataCell = row.insertCell(3);
                saveDataCell.innerHTML = user.saveData ? '✓' : '';
                
                var editCell = row.insertCell(4);
                editCell.innerHTML = '<button class="action-btn edit-btn" onclick="editUser(' + i + ')">Edit</button>';
                
                var deleteCell = row.insertCell(5);
                deleteCell.innerHTML = '<button class="action-btn delete-btn" onclick="deleteUser(' + i + ')">Delete</button>';
            }
            
            userCount.textContent = 'NO of User ' + users.length;
        }
        
        function editUser(index) {
            var user = users[index];
            
            document.getElementById('name').value = user.name;
            document.getElementById('email').value = user.email;
            document.getElementById('cardType').value = user.cardType;
            document.getElementById('saveData').checked = user.saveData;
            
            var titleRadio = document.querySelector('input[name="title"][value="' + user.title + '"]');
            if (titleRadio) {
                titleRadio.checked = true;
            }
            
            editingIndex = index;
        }
        
        function deleteUser(index) {
            if (confirm('Are you sure you want to delete this user?')) {
                users.splice(index, 1);
                saveToLocalStorage();
                displayUsers();
            }
        }
        
        function searchUsers() {
            var searchTerm = document.getElementById('searchInput').value.toLowerCase();
            var tableBody = document.getElementById('usersTableBody');
            var rows = tableBody.getElementsByTagName('tr');
            
            for (var i = 0; i < rows.length; i++) {
                var nameCell = rows[i].getElementsByTagName('td')[0];
                if (nameCell) {
                    var name = nameCell.textContent.toLowerCase();
                    if (name.indexOf(searchTerm) > -1) {
                        rows[i].style.display = '';
                    } else {
                        rows[i].style.display = 'none';
                    }
                }
            }
        }
        
        function clearForm() {
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('cardType').value = 'Visa';
            document.getElementById('saveData').checked = true;
            document.querySelector('input[name="title"][value="Mister"]').checked = true;
        }
        
        window.onload = function() {
            loadUsers();
        };