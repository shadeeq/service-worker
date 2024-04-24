self.addEventListener('message', event => {
  console.log('SHOWPOPUPS SERVICE WORKER')
  if (event.data && event.data.type === 'SET_SHOW_POPUPS') {
    const showPopups = event.data.showPopups;
    console.log('showPopups is set to:', showPopups);

    if (showPopups) {
      console.log('Show popups are true');
      // Handle logic when showPopups is true
    } else {
      console.log('Show popups are false');
      // Handle logic when showPopups is false
    }
  }
});
