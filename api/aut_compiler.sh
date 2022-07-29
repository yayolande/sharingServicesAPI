#!/bin/bash
# Use it this instead during the debuging phase #!/bin/bash -xv

files='ls *.ts';
declare -a currentUpdateTime;
declare -a lastFileUpdate;

while true ; do

   counter=0;
   for i in $($files) ;do
      echo "file is : $i"
      currentUpdateTime[counter]=$(stat --format="%Y" $i)

      if [[ "${currentUpdateTime[counter]}" -gt "${lastFileUpdate[counter]}" ]] ;then
         lastFileUpdate[counter]=${currentUpdateTime[counter]};

         tsc $i 2>> compilation_error;

         echo "compiled $i";
      fi

      counter=$(( $counter + 1));

   done

done

# tsc $files
