import create from 'zustand';

interface State {
  maxPersonsNo: number;
  personsNo: number;
  changePersonsNo: (value?: string) => void;
  increase: () => void;
  decrease: () => void;
}

export const useFormStore = create<State>((set, get) => ({
  maxPersonsNo: 10,
  personsNo: 0,
  changePersonsNo: (value) => {
    let person = 0;
    if (value) person = parseInt(value);
    if (person < 0) return;

    const personsNo = Math.min(person, get().maxPersonsNo);
    set({ personsNo });
  },
  increase: () =>
    set({ personsNo: Math.min(get().maxPersonsNo, get().personsNo + 1) }),
  decrease: () => set({ personsNo: Math.max(0, get().personsNo - 1) }),
}));
