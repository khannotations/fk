inp = File.open("in.txt", "r")
out = File.open("out.txt", "w")
rel = "13-7" # change this every day!!

extra = "" # to add the .hide class later (or .tall)
inp.each do |line|
  inps = line.strip.split("|")
  pic = inps[0]
  caption = inps[1]
  first = "a.fancybox-thumb#{extra}(rel='#{rel}', href='/images/italia/#{rel}/#{pic}', title='#{caption}')"
  second = "img.tile(src='/images/italia/#{rel}/#{pic}')"

  out.puts("#{first}\n\t#{second}\n\n")
  extra = ".hide" # everything after the first one, hide
end

inp.close
out.close