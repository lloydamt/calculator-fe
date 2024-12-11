import { mount, VueWrapper } from "@vue/test-utils";
import ErrorModal from "./ErrorModal.vue";

describe('Error Modal suite', () => {
    let wrapper: VueWrapper<Partial<typeof ErrorModal>>

    beforeEach(() => {
        wrapper = mount(ErrorModal)
    })

    afterEach(() => wrapper.unmount())

    test('modal should be closed by default', () => {
        expect(wrapper.find('.backdrop').exists()).toBe(false)
        expect(wrapper.find('h2').exists()).toBe(false)
        expect(wrapper.find('dialog').exists()).toBe(false)
    })

    test('should render elements', async () => {
        await wrapper.setProps({isOpen: true})
        expect(wrapper.find('.backdrop').exists()).toBe(true)
        expect(wrapper.find('h2').exists()).toBe(true)
        expect(wrapper.find('dialog').exists()).toBe(true)
    })

    test('should emit clear error when backdrop is clicked', async () => {
        await wrapper.setProps({isOpen: true})

        await wrapper.find('.backdrop').trigger('click')

        expect(wrapper.emitted('clearError')).toBeTruthy()
    })
})