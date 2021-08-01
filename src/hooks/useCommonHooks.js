import { useRouter } from 'vue-router';

const useCommonHooks = () => {
  const router = useRouter();
  const jumpToPage = (name, query) => {
    router.push({
      name,
      query,
    });
  };

  return {
    jumpToPage,
  };
};

export default useCommonHooks;
