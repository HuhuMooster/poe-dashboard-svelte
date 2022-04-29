import { publish } from 'gh-pages';

publish(
  'public',
  {
    branch: 'gh-pages',
    repo: 'https://github.com/HuhuMooster/poe-dashboard-svelte.git',
    user: {
      name: 'HuhuMooster',
      email: '48298486+HuhuMooster@users.noreply.github.com'
    }
  },
  () => {
    console.log('Deploy Complete!')
  }
)