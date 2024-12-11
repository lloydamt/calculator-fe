import { mount, VueWrapper } from "@vue/test-utils";
import SimpleCalculator from "./SimpleCalculator.vue";
import ErrorModal from "./ErrorModal.vue";

describe("Simple Calculator suite", () => {
  let wrapper: VueWrapper<Partial<typeof SimpleCalculator>>;

  beforeEach(() => {
    wrapper = mount(SimpleCalculator);
  });

  afterEach(() => wrapper.unmount());

  it("should render calculator elements to the page", () => {
    expect(wrapper.find(".container").exists()).toBe(true);
    expect(wrapper.find(".display").exists()).toBe(true);
    expect(wrapper.findAll(".calc-input")).toHaveLength(2);
    expect(wrapper.findAll(".button")).toHaveLength(4);
    expect(wrapper.find(".clear").exists()).toBe(true);
    expect(wrapper.findComponent(ErrorModal).exists()).toBe(true);
  });

  it("should add 2 numbers", async () => {
    await setInputs(20, 20);
    await wrapper.findAll("button")[0].trigger("click");

    expect(wrapper.vm.result).toBe(40);
  });

  it("should subtract 2 numbers", async () => {
    await setInputs(20, 20);
    await wrapper.findAll("button")[1].trigger("click");

    expect(wrapper.vm.result).toBe(0);
  });

  it("should multiply 2 numbers", async () => {
    await setInputs(20, 20);
    await wrapper.findAll("button")[2].trigger("click");

    expect(wrapper.vm.result).toBe(400);
  });

  it("should divide 2 numbers", async () => {
    await setInputs(20, 20);
    await wrapper.findAll("button")[3].trigger("click");

    expect(wrapper.vm.result).toBe(1);
  });

  it("should replace the first input with the result", async () => {
    await setInputs(20, 20);
    expect(wrapper.findAll("input")[0].element.value).toBe("20");

    await wrapper.findAll("button")[0].trigger("click");

    expect(wrapper.findAll("input")[0].element.value).toBe("40");
  });

  it("should reset inputs and display when clear button is clicked", async () => {
    await setInputs(30, 50);
    expect(wrapper.findAll("input")[0].element.value).toBe("30");
    expect(wrapper.findAll("input")[1].element.value).toBe("50");

    await wrapper.findAll("button")[0].trigger("click");

    expect(wrapper.find<HTMLDivElement>(".display").element.textContent).toBe(
      "80"
    );
    expect(wrapper.findAll("input")[0].element.value).toBe("80");

    await wrapper.find(".clear").trigger("click");

    expect(wrapper.findAll("input")[0].element.value).toBe("0");
    expect(wrapper.findAll("input")[1].element.value).toBe("0");
    expect(wrapper.find<HTMLDivElement>(".display").element.textContent).toBe(
      "0"
    );
  });

  it("state should initially be default", () => {
    expect(wrapper.vm.result).toBe(0)
    expect(wrapper.vm.userInput).toBe(0)
    expect(wrapper.vm.userInput2).toBe(0)
    expect(wrapper.vm.isErrorModalOpen).toBe(false)
    expect(wrapper.vm.errorMessage).toBe('')
  })

  test('clear function should reset input values', () => {
    wrapper.vm.userInput = 10;
    wrapper.vm.userInput2 = 20;
    wrapper.vm.result = 30;

    wrapper.vm.clear()

    expect(wrapper.vm.result).toBe(0)
    expect(wrapper.vm.userInput).toBe(0)
    expect(wrapper.vm.userInput2).toBe(0)
  })

  test('clearError function should reset error state', () => {
    wrapper.vm.isErrorModalOpen = true
    wrapper.vm.errorMessage = 'error'

    wrapper.vm.clearError()

    expect(wrapper.vm.isErrorModalOpen).toBe(false)
    expect(wrapper.vm.errorMessage).toBe('')
  })

  test('should display division by zero error modal', async () => {
    expect(wrapper.vm.isErrorModalOpen).toBe(false)
    expect(wrapper.vm.errorMessage).toBe('')

    await setInputs(20, 0);
    await wrapper.findAll("button")[3].trigger("click");

    expect(wrapper.vm.isErrorModalOpen).toBe(true)
    expect(wrapper.vm.errorMessage).toBe("Cannot divide by 0")
    expect(wrapper.findComponent(ErrorModal).props('isOpen')).toBe(true)
  })

  test('error modal should emit clear when clicked', async () => {
    await setInputs(20, 0);
    await wrapper.findAll("button")[3].trigger("click");

    expect(wrapper.findComponent(ErrorModal).props('isOpen')).toBe(true)

    wrapper.findComponent(ErrorModal).vm.$emit('clearError')
    expect(wrapper.vm.isErrorModalOpen).toBe(false)
    expect(wrapper.vm.errorMessage).toBe('')
  })

  const setInputs = async (input1: number, input2: number) => {
    await wrapper.findAll("input")[0].setValue(input1);
    await wrapper.findAll("input")[1].setValue(input2);
  };
});
