const { expect } = require('chai');
const { parse } = require('./index');
// const qs = require('qs');
const expectToEqual = (actual, expected) => expect(actual).to.deep.equal(expected);


// describe('qs Parser', () => {
//   it('parses query fields', () => {
//     const querystring = `
//       name=John%20Doe
//       &
//       age=35
//       &
//       bio=A%20generic%20man.`
//       .replace(/\s+/g, '');
//     const actual = qs.parse(querystring);

//     const expected = {
//       name: 'John Doe',
//       age: '35',
//       bio: 'A generic man.'
//     };
//     expectToEqual(actual, expected);
//   });

//   it('parses nested query fields', () => {
//     const querystring = `
//       title=A%20Person
//       &
//       person[name]=John%20Doe
//       &
//       person[about][age]=45
//       &
//       person[about][bio]=A%20Dude.
//       &
//       comment[person][status][today]=present`
//       .replace(/\s+/g, '');
//     const actual = qs.parse(querystring);

//     const expected = {
//       title: 'A Person',
//       person: {
//         name: 'John Doe',
//         about: {
//           age: '45',
//           bio: 'A Dude.'
//         }
//       },
//       comment: {
//         person: {
//           status: {
//             today: 'present'
//           }
//         }
//       }
//     };
//     expectToEqual(actual, expected);
//   });

//   it('parses array query fields', () => {
//     const querystring = `
//       comments[0][user]=shanebo
//       &
//       comments[0][date]=today
//       &
//       comments[0][comment]=Here+is+my+comment
//       &
//       comments[1][user]=joe
//       &
//       comments[1][date]=tomorrow
//       &
//       comments[1][comment]=This+is+the+comment
//       &
//       posts[0][title]=My%20Post
//       &
//       posts[0][tags]=uno
//       &
//       posts[0][tags]=dos
//       &
//       posts[0][tags]=tres
//       &
//       posts[0][author][details][age]=32
//       &
//       names[0]=John
//       &
//       names[1]=Charles
//       &
//       names[2]=Martin
//       `
//       .replace(/\s+/g, '');
//     const actual = qs.parse(querystring);

//     const expected = {
//       comments: [
//         {
//           user: 'shanebo',
//           date: 'today',
//           comment: 'Here is my comment'
//         },
//         {
//           user: 'joe',
//           date: 'tomorrow',
//           comment: 'This is the comment'
//         }
//       ],
//       posts: [
//         {
//           title: 'My Post',
//           tags: ['uno', 'dos', 'tres'],
//           author: {
//             details: {
//               age: '32'
//             }
//           }
//         }
//       ],
//       names: [
//         'John',
//         'Charles',
//         'Martin'
//       ]
//     };
//     expectToEqual(actual, expected);
//   });
// });

describe('Querystrang Parser', () => {
  it('parses query fields', () => {
    const querystring = `
      name=John%20Doe
      &
      age=35
      &
      bio=A%20generic%20man.`
      .replace(/\s+/g, '');
    const actual = parse(querystring);

    const expected = {
      name: 'John Doe',
      age: '35',
      bio: 'A generic man.'
    };
    expectToEqual(actual, expected);
  });

  it('parses nested query fields', () => {
    const querystring = `
      title=A%20Person
      &
      person[name]=John%20Doe
      &
      person[about][age]=45
      &
      person[about][bio]=A%20Dude.
      &
      comment[person][status][today]=present`
      .replace(/\s+/g, '');
    const actual = parse(querystring);

    const expected = {
      title: 'A Person',
      person: {
        name: 'John Doe',
        about: {
          age: '45',
          bio: 'A Dude.'
        }
      },
      comment: {
        person: {
          status: {
            today: 'present'
          }
        }
      }
    };
    expectToEqual(actual, expected);
  });

  it('parses array query fields', () => {
    const querystring = `
      comments[0][user]=shanebo
      &
      comments[0][date]=today
      &
      comments[0][comment]=Here+is+my+comment
      &
      comments[1][user]=joe
      &
      comments[1][date]=tomorrow
      &
      comments[1][comment]=This+is+the+comment
      &
      posts[0][title]=My%20Post
      &
      posts[0][tags][]=uno
      &
      posts[0][tags][]=dos
      &
      posts[0][tags][]=tres
      &
      posts[][author][details][age]=32
      &
      names[0]=John
      &
      names[1]=Charles
      &
      names[2]=Martin
      `
      .replace(/\s+/g, '');
    const actual = parse(querystring);

    const expected = {
      comments: [
        {
          user: 'shanebo',
          date: 'today',
          comment: 'Here is my comment'
        },
        {
          user: 'joe',
          date: 'tomorrow',
          comment: 'This is the comment'
        }
      ],
      posts: [
        {
          title: 'My Post',
          tags: ['uno', 'dos', 'tres'],
          author: {
            details: {
              age: '32'
            }
          }
        }
      ],
      names: [
        'John',
        'Charles',
        'Martin'
      ]
    };
    expectToEqual(actual, expected);
  });
});
