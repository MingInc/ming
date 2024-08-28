import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ProjectCard from "@/components/ProjectCard";
import TemplateCard from "@/components/TemplateCard";

export default function Projects() {
  return (
    <div className="mx-auto max-w-7xl container">
      <div className="my-8">
        <p className="text-2xl font-medium">Let's build something new.</p>
        <p className="text-sm text-gray-600">
          To deploy a new Project, import an existing Git Repository or get
          started with one of our Templates.
        </p>
      </div>

      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-2">
        <div className="border p-3 px-4 rounded-md">
          <p className="text-md font-medium border-b-2 pb-2 mb-2">
            <i className="ri-settings-line"></i> Configure Project
          </p>
          <p className="text-sm font-medium my-1">Project Name</p>
          <input
            type="text"
            placeholder="Your Amazing Project"
            className="text-sm w-full border p-1 px-2"
          />
          <p className="text-sm font-medium my-1">GitHub URL</p>
          <input
            type="text"
            placeholder="https://github.com/MingInc/ming.git"
            className="w-full border p-1 px-2 text-sm"
          />
          <p className="text-sm font-medium my-1">Framework</p>
          <Select>
            <SelectTrigger className="w-full text-sm">
              <SelectValue placeholder="Choose framework..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Vite</SelectItem>
              <SelectItem value="dark">React.js</SelectItem>
              <SelectItem value="system">Next.js</SelectItem>
            </SelectContent>
          </Select>

          <p className="text-sm font-medium my-1">Root Directory</p>
          <input
            type="text"
            placeholder="./"
            className="w-full border p-1 px-2 text-sm"
          />

          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-sm">
                Build & Output Settings
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-sm font-medium my-1">Build Command</p>
                <input
                  type="text"
                  placeholder="npm run build"
                  className="w-full border p-1 px-2 text-sm"
                />
                <p className="text-sm font-medium my-1">Output Directory</p>
                <input
                  type="text"
                  placeholder="dist"
                  className="w-full border p-1 px-2 text-sm"
                />
                <p className="text-sm font-medium my-1">Install Command</p>
                <input
                  type="text"
                  placeholder="npm install"
                  className="w-full border p-1 px-2 text-sm"
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-sm">
                Environment Variables
              </AccordionTrigger>
              <AccordionContent>
                <textarea rows={4} className="border w-full"></textarea>
                <p>TIP: Paste a .env above to populate the form</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <button className="text-sm text-white bg-black w-full py-2 mt-4 rounded-sm">
            Deploy
          </button>
        </div>
        <div className="border p-3 px-4 rounded-md">
          <div className="items-center flex justify-between">
            <p className="text-sm font-medium">Clone Template</p>
            <Select>
              <SelectTrigger className="w-[120px] text-sm">
                <SelectValue placeholder="Framework" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Vite</SelectItem>
                <SelectItem value="dark">React.js</SelectItem>
                <SelectItem value="system">Next.js</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <TemplateCard />
        </div>
      </div>
    </div>
  );
}
