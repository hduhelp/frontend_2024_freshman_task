let answer = [];

function generateUniqueId() {
  // 这里使用了一个简单的示例来生成一个唯一的 ID
  // 在实际应用中，你可能需要更复杂的逻辑来确保 ID 的唯一性
  return `q-${Date.now()}-${Math.floor(Math.random() * 1000000)}`;
}

function post() {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const author_email = document.getElementById('author_email').value;
  const detail = document.getElementById('detail').value;
  // 通常 'created_at' 应该是由服务器设置的，但这里我们假设它是可选的
  const created_at = document.getElementById('created_at').value || new Date().toISOString();

  // 生成唯一 ID
  const id = generateUniqueId();

  // 创建FormData对象
  const formData = new FormData();
  formData.append('title', title);
  formData.append('author', author);
  formData.append('author_email', author_email);
  formData.append('detail', detail);
  formData.append('created_at', created_at);
  formData.append('answer', JSON.stringify(answer)); // 如果服务器需要数组，可以将其转换为字符串
  formData.append('id', id);

  // 使用fetch API发送POST请求
  fetch('https://hduhelp.woshiluo.com/api/question', {
    method: 'POST',
    body: formData,
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json(); // 假设服务器返回JSON
  })
  .then(data => {
    console.log('Success:', data); // 在这里处理成功的情况
  })
  .catch(error => {
    console.error('There was a problem with your fetch operation:', error); // 在这里处理错误的情况
  });
}