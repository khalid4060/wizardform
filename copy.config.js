module.exports = {
    verbose: true, // Optional: Display copy process details
    targets: [
      { src: 'src/lesssonFiles/*', dest: 'public/' },
      // You can add more copy targets as needed
    ],
  };