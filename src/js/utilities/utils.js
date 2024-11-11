const utils = {
    redirectTo: (path) => {
      if (typeof path !== 'string') throw new Error('path must be a string');
      window.location.href = path;
    },
  
    getUrlParams: (param) => {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get(param);
    },
  
    date: (dateString) => {
      const date = new Date(dateString);
      const today = new Date();
  
      // Custom mapping for 3-letter month abbreviations
      const monthNames = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ];
  
      const day = date.getDate();
      const month = monthNames[date.getMonth()]; // Get the 3-letter month abbreviation
  
      let formattedDate = `${month} ${day}`;
  
      // Add the year only if it's not the current year
      if (date.getFullYear() !== today.getFullYear()) {
        formattedDate += ` ${date.getFullYear()}`;
      }
  
      return formattedDate;
    },
  
    // time: (date) => {
    //   const now = new Date();
    //   const createdTime = new Date(date);
    //   const secondsAgo = Math.floor((now - createdTime) / 1000);
  
    //   let interval = Math.floor(secondsAgo / 31536000); // years
    //   if (interval > 1) return `${interval} years ago`;
    //   if (interval === 1) return '1 year ago';
  
    //   interval = Math.floor(secondsAgo / 2592000); // months
    //   if (interval > 1) return `${interval} months ago`;
    //   if (interval === 1) return '1 month ago';
  
    //   interval = Math.floor(secondsAgo / 86400); // days
    //   if (interval > 1) return `${interval} days ago`;
    //   if (interval === 1) return '1 day ago';
  
    //   interval = Math.floor(secondsAgo / 3600); // hours
    //   if (interval > 1) return `${interval} hours ago`;
    //   if (interval === 1) return '1 hour ago';
  
    //   interval = Math.floor(secondsAgo / 60); // minutes
    //   if (interval > 1) return `${interval} minutes ago`;
    //   if (interval === 1) return '1 minute ago';
  
    //   return secondsAgo > 1 ? `${secondsAgo} seconds ago` : 'now';
    // },
  
    formatTags: (tags) => {
    if (typeof tags === 'string') {
      tags = [tags]; // Wrap the string in an array
    }
    if (!tags || tags.length === 0) return '';
    return tags
      .map(
        (tag) =>
          `<a href="/tags/?tag=${encodeURIComponent(
            tag
          )}" class="tag bg-gray-100 rounded-2xl text-sm px-1 py-2 hover:bg-gray-200">#${tag}</a>`
      ) // Add '#' before each tag
      .join(' '); // Join tags with a space
  },
};
  
  export default utils;
  