export const dummyData = {
  statement: {
    content: [
      {
        component_name: 'html',
        component_id: 'stmt_id_1',
        file_name: ['<p>What is the capital of France?</p>'],
      },
    ],
  },
  //   stem_image: {
  //     component_name: 'image',
  //     component_id: 'stmt_id_1',
  //     file_name: ['https://via.placeholder.com/150'],
  //   },
  see_why: {
    content: [
      {
        component_name: 'html',
        component_id: 'why_id_1',
        file_name: [
          '<p>The capital of France is Paris. It is known for its rich history and culture.</p>',
        ],
      },
    ],
  },
  options: [
    {
      option_id: 1,
      is_correct: true,
      content: [
        {
          component_name: 'html',
          component_id: 'opt1_id',
          file_name: ['<p>Paris</p>'],
        },
      ],
    },
    {
      option_id: 2,
      is_correct: false,
      content: [
        {
          component_name: 'html',
          component_id: 'opt2_id',
          file_name: ['<p>London</p>'],
        },
      ],
    },
    {
      option_id: 3,
      is_correct: false,
      content: [
        {
          component_name: 'html',
          component_id: 'opt3_id',
          file_name: ['<p>Berlin</p>'],
        },
      ],
    },
    {
      option_id: 4,
      is_correct: false,
      content: [
        {
          component_name: 'html',
          component_id: 'opt4_id',
          file_name: ['<p>Madrid</p>'],
        },
      ],
    },
  ],
  feedback: {
    correct: {
      content: [
        {
          component_name: 'html',
          component_id: 'correct_fb_id',
          file_name: ['<p>Correct! Paris is the capital of France.</p>'],
        },
      ],
    },
    incorrect: {
      content: [
        {
          component_name: 'html',
          component_id: 'incorrect_fb_id',
          file_name: ['<p>Incorrect. The correct answer is Paris.</p>'],
        },
      ],
    },
  },
};
