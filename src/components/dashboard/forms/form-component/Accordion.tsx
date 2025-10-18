import Accordion from "@corvu/accordion";

export default function AccordionComp () {
	return (
	<>
	<Accordion collapseBehavior="hide">
        <Accordion.Item>
          <h2>
            <Accordion.Trigger class="w-full border-b border-corvu-300 bg-corvu-100 px-4 py-3 text-left font-medium transition-all duration-100 hover:bg-corvu-200 focus-visible:bg-corvu-200 focus-visible:outline-hidden">
              What is corvu?
            </Accordion.Trigger>
          </h2>
          <Accordion.Content class="overflow-hidden border-b border-corvu-300 bg-corvu-100 data-expanded:animate-expand data-collapsed:animate-collapse">
            <div class="px-4 py-2">
              A collection of unstyled, customizable UI primitives for SolidJS.
            </div>
          </Accordion.Content>
        </Accordion.Item>
  </Accordion>
  </>
  )
}
