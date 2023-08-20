chrome.action.onClicked.addListener(async (tab) => {
  let url = tab.url;
  if (/https:\/\/github.com\/.*blob.*\.[json|y?ml]/.test(tab.url)) {
    const cookies = await chrome.cookies.getAll({ url: 'https://github.com/' });
    const cookie = cookies.map((c) => `${c.name}=${c.value}`).join('; ');
    url = await fetch(url.replace('blob', 'raw'), {
      headers: {
        cookie,
      },
      method: 'GET',
    }).then((res) => {
      return res.url;
    });
  }
  if (/https:\/\/.*\.[json|y?ml]/.test(url)) {
    chrome.tabs.create({
      url: `https://swagger-ui-viewer.vercel.app/?url=${url}`,
    });
  }
});
