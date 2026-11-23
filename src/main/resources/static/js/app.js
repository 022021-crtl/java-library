const API = '/book';

/* ---------- 消息提示 ---------- */
function showMsg(text, isOk) {
    const el = document.getElementById('msg');
    el.textContent = text;
    el.className = isOk ? 'msg-ok' : 'msg-err';
    if (isOk) setTimeout(() => { el.textContent = ''; }, 2000);
}

/* 在表格中显示一行占位（空数据 / 加载失败） */
function showPlaceholder(text, isError) {
    const tbody = document.getElementById('bookTable');
    tbody.innerHTML = `<tr><td colspan="6" class="${isError ? 'msg-err' : 'empty-cell'}">${text}</td></tr>`;
}

/* ---------- 查询 ---------- */
async function loadBooks() {
    try {
        const res = await fetch(API + '/list');
        if (!res.ok) throw new Error('HTTP ' + res.status);
        const list = await res.json();

        const tbody = document.getElementById('bookTable');
        tbody.innerHTML = '';
        if (!list || list.length === 0) {
            showPlaceholder('暂无数据', false);
            return;
        }
        list.forEach(b => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${b.id}</td>
                <td>${b.bookName ?? ''}</td>
                <td>${b.author ?? ''}</td>
                <td>${b.price ?? ''}</td>
                <td>${b.stock ?? ''}</td>
                <td class="actions">
                    <button class="btn btn-primary" onclick="editBook(${b.id})">编辑</button>
                    <button class="btn btn-danger" onclick="deleteBook(${b.id})">删除</button>
                </td>`;
            tbody.appendChild(tr);
        });
    } catch (e) {
        showMsg('加载失败：' + e.message, false);
        showPlaceholder('列表加载失败：' + e.message + '（请检查后端 / MySQL 是否启动）', true);
    }
}

/* ---------- 新增 / 修改 ---------- */
function getFormData() {
    return {
        id: document.getElementById('bookId').value ? Number(document.getElementById('bookId').value) : null,
        bookName: document.getElementById('bookName').value,
        author: document.getElementById('author').value,
        price: document.getElementById('price').value ? Number(document.getElementById('price').value) : null,
        stock: document.getElementById('stock').value ? Number(document.getElementById('stock').value) : null
    };
}

async function submitBook() {
    const data = getFormData();
    const isEdit = !!data.id;
    try {
        const res = await fetch(isEdit ? API + '/update' : API + '/add', {
            method: isEdit ? 'PUT' : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error('HTTP ' + res.status);
        showMsg(isEdit ? '修改成功' : '添加成功', true);
        resetForm();
        loadBooks();
    } catch (e) {
        showMsg('保存失败：' + e.message, false);
    }
}

/* ---------- 编辑（按 id 查详情并回填表单） ---------- */
async function editBook(id) {
    try {
        const res = await fetch(API + '/' + id);
        if (!res.ok) throw new Error('HTTP ' + res.status);
        const b = await res.json();
        document.getElementById('bookId').value = b.id;
        document.getElementById('bookName').value = b.bookName ?? '';
        document.getElementById('author').value = b.author ?? '';
        document.getElementById('price').value = b.price ?? '';
        document.getElementById('stock').value = b.stock ?? '';
        document.getElementById('formTitle').textContent = '编辑图书（ID: ' + b.id + '）';
    } catch (e) {
        showMsg('加载详情失败：' + e.message, false);
    }
}

/* ---------- 删除 ---------- */
async function deleteBook(id) {
    if (!confirm('确定删除 ID=' + id + ' 的图书吗？')) return;
    try {
        const res = await fetch(API + '/' + id, { method: 'DELETE' });
        if (!res.ok) throw new Error('HTTP ' + res.status);
        showMsg('删除成功', true);
        loadBooks();
    } catch (e) {
        showMsg('删除失败：' + e.message, false);
    }
}

/* ---------- 表单重置 ---------- */
function resetForm() {
    document.getElementById('bookId').value = '';
    document.getElementById('bookName').value = '';
    document.getElementById('author').value = '';
    document.getElementById('price').value = '';
    document.getElementById('stock').value = '';
    document.getElementById('formTitle').textContent = '新增图书';
}

/* 页面加载后拉取列表 */
loadBooks();
