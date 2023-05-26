interface InputProps {
  id: string
  onChange: any
  value: string
  label: string
  type?: string
}
const Input: React.FC<InputProps> = ({
  id,
  onChange,
  value,
  label,
  type,
}) => {
  return (
    <div className="relative">
      <input
        value={value}
        onChange={onChange}
        id={id}
        type={type}
        className="
          block
          rounded-md
          px-6
          pt-6
          pb-1
          w-full
          text-md
          text-white
          bg-neutral-700
          // 清除默认样式
          appearance-none
          focus:outline-none
          // 聚焦时移除输入框的焦点环
          focus:ring-0
          // 基于同级元素的状态应用标记
          peer
        "
        placeholder=" "
      />
      <label
        htmlFor={id}
        className="
          absolute
          text-md
          // 设置标签文本的颜色为锌色
          text-zinc-400
          // 单位 ms
          duration-300
          transform
          // - 表示负值
          -translate-y-3
          scale-75
          top-4
          z-10
          // 设置变换的原点为左上角 1 表示右上 4 表示中间
          origin-[0]
          left-6
          // 当 peer 元素的 placeholder 有值时，将本元素的缩放设置为原始大小
          peer-placeholder-shown:scale-100
          peer-placeholder-shown:translate-y-0
          peer-focus:scale-75
          // 当 peer 元素聚焦时，将本元素的垂直位移向上移动 3 个单位
          peer-focus:-translate-y-3
        "
      >
        {label}
      </label>
    </div>
  )
}

export default Input
